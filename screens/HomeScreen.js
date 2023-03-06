import React, { useState, useEffect, useContext  } from 'react';
import { Text, Avatar } from 'react-native-paper';
import { StyleSheet, SafeAreaView, View, Dimensions, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../Constants/Colors';
import { fetchCategories } from '../services/dataservice';
import urlFor from '../sanity';
import { UserContext } from "../services/UserContext";

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 78;

const HomeScreen = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const [selectedCategoryId, setSelectedCategoryId] = React.useState(0);
    const [categoriesData, setCategoriesData] = useState([]);
    const [userProfileImg, setUserProfileImg] = useState(user.image !== null || user.image !== undefined ? user.image : "https://live.staticflickr.com/65535/52726962560_59bd2948fe_m.jpg")
    useEffect(() => {
        const loadCategories = async () => {
            await fetchCategories().then((data) => {

                setCategoriesData(data);
                setSelectedCategoryId(data[0]._id)
            }).catch((error) => {
                console.log(error);
            });

        }
        loadCategories();
       
    }, []);

    const navigateToServiceForm = (details) => {
        navigation.navigate('SubCategory', { 'details': details, 'categoryIndex': selectedCategoryIndex });
    }

    const onClickCategoryIndex = (index, categoryId) => {
        setSelectedCategoryIndex(index);
        setSelectedCategoryId(categoryId);
    }

    const onPressSearchBar = () => {
        navigation.navigate("Search");
    }

    const getImageUrl = (imageUrl) => {
        const ref = imageUrl;
        const splitedUrl = ref.split('-');
        const id = splitedUrl[1] + '-' + splitedUrl[2];
        const url = `https://cdn.sanity.io/images/jhnl5pei/production/${id}.png`;
        return url;
    }

    const ListCategories = () => {
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.categoriesListContainer}>
                {categoriesData.map((category, index) => (

                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={() => onClickCategoryIndex(index, category._id)}>
                        <View
                            style={{
                                backgroundColor:
                                    selectedCategoryIndex == index
                                        ? COLORS.primary
                                        : COLORS.light,
                                ...style.categoryBtn,
                            }}>
                            <View style={style.categoryBtnImgCon}>
                                <Image
                                    source={{ uri: getImageUrl(category.image.asset._ref) }}
                                    style={{ height: 40, width: 40, resizeMode: 'cover' }}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    marginLeft: 10,
                                    color:
                                        selectedCategoryIndex == index
                                            ? COLORS.white
                                            : COLORS.primary,
                                }}>
                                {category.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };
    const Card = ({ food }) => {
        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}
                onPress={() => navigateToServiceForm(food)}>
                <View style={style.card}>
                    <View style={{ alignItems: 'center', top: -10 }}>
                        <Image source={{ uri: getImageUrl(JSON.stringify(food.image.asset._ref)) }} style={{ height: 45, width: 45 }} />
                    </View>
                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: COLORS.darkgrey }}>{food.name}</Text>

                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    const FlatListItems = () => {
        const subCategoriesData = categoriesData[selectedCategoryIndex].subCategories;
        //console.log(categoriesData[0].subCategories[0].image.asset._ref);
        return (<FlatList
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={subCategoriesData}
            renderItem={({ item }) => <Card food={item} />}
        />);
    }

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, marginTop: 30 }}>
            <View>
                <View style={style.header}>

                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            {/* <FontAwesome name="user-circle-o" size={50} style={{ height: 50, width: 50, borderRadius: 25, marginTop: 5, color: COLORS.primary }} /> */}
                            <Avatar.Image
                                source={{
                                    uri:userProfileImg
                                }}
                                size={50}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                            <Text style={{ fontSize: 20 }}>Hello,</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>
                                {user.name}
                            </Text>
                        </View>
                    </View>

                </View>
                <Text style={{ marginTop: -15, fontSize: 18, color: COLORS.grey, marginLeft: 90 }}>
                    What do you want today
                </Text>
            </View>
            <View
                style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                }}>
                <View style={style.inputContainer}>
                    <FontAwesome name="search" size={28} />

                    <TextInput onPressIn={onPressSearchBar}
                        style={{ flex: 1, fontSize: 18, paddingLeft: 5 }}
                        placeholder="Search for service"
                    />
                </View>
                <View style={style.sortBtn}>
                    <MaterialCommunityIcons name="tune" color={COLORS.white} size={28} />

                </View>
            </View>
            <View>


                <ListCategories />
            </View>
            {categoriesData.length > 0 &&
                <FlatListItems />}

        </SafeAreaView >
    );
};


const style = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,

    },
    inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.light,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    sortBtn: {
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    categoryBtn: {
        height: 60,
        width: 140,
        marginRight: 7,
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    categoryBtnImgCon: {
        height: 50,
        width: 50,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        height: 80,
        width: cardWidth,
        marginHorizontal: 6,
        marginBottom: 20,
        marginTop: 10,
        borderRadius: 15,
        elevation: 13,
        backgroundColor: COLORS.white,
    },
    addToCartBtn: {
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default HomeScreen;
