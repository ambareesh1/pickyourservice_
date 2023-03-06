import client from '../sanity';
import axios from 'axios';
import { createClient, uploadAsset } from '@sanity/client'
import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system'



const fetchUserDetails = () => {
    client.fetch(`*[_type == "users"]`).then((data) => {
        return data;
    }).catch((error) => {
        console.log("Error while fetching user details");
    })
}

export const fetchCategories = async () => {
    try {
        const query = `*[_type == "category"]{
            _id,
            name,
            image,
            isActive,
            subCategories[]{
              _key,
              name,
              image,
              isActive,
              details[]{
                _key,
                service,
                price,
                image,
                isActive,
                isSqFeetIncluded
              }
            }
          }`;
        const categories = await client.fetch(query);
        return categories;
    } catch (error) {
        console.error(error);
    }
}

export const createUser = (bodyObj) => {
    client.create(
        {
            _type: 'users',
          ...bodyObj
        }
    )
        .then(res => console.log('Data inserted successfully', res))
        .catch(err => console.error('Error inserting data', err.message));
}
export const insertData = () => {
    client.create(
        {
            _type: 'insert',
            name: 'Mouni',
            email: 'Moksha@example.com'
        }
    )
        .then(res => console.log('Data inserted successfully', res))
        .catch(err => console.error('Error inserting data', err.message));
}


export const uploadImage = async (imagePath) => {

  try {
    // Read the image file from local file system
    const bytes = await fetch(imagePath);
    const imageBuffer =  await bytes.blob();;

    // Upload the asset to Sanity.io
    const imageAsset = await client.assets.upload('image', imageBuffer, { filename: 'image' });
   
    // Build the document object with a reference to the uploaded image asset
    const doc = {
      _type: 'image',
      name: imageAsset.originalFilename,
      asset: {
        _type: 'reference',
        _ref: imageAsset._id,
      },
      // Additional fields for the image document
      // ...
    };

    // Create the image document in Sanity.io
    const createdDoc = await client.create(doc);


    // Return the URL of the uploaded asset
    const imageUrl = `https://${client.config().dataset}.cdn.sanity.io/${imageAsset._id}`;
    console.log('Sanity image url', createdDoc.asset._ref);

    return createdDoc.asset._ref;
        }
      catch (error) {
      console.error(error);
      throw new Error('Failed to upload image');
    }
  };

  export const deleteRow = async (id) =>{
   
    const query = '*[_type == "users"]';
    client.fetch(query)
  .then(rows => {
    const idToDelete = id; // Change this to the ID of the row you want to delete

    // Construct and execute the delete mutation
    const mutation = `mutation {
      delete {
        ${idToDelete}
      }
    }`;
    return client.request(mutation);
  })
  }

  export const 
  getUserDetails = async(phoneNo) =>{
    const query = `*[_type == "users" && phoneNo == "9535770068"][0]`;
    const userDetails = await client.fetch(query).catch((error) => {
        console.log("Error while fetching user details");
    });
    return userDetails;
  }




export default { fetchUserDetails, fetchCategories, createUser, insertData, uploadImage, deleteRow, getUserDetails };