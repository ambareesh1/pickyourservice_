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
  return client.create({
    _type: 'users',
    ...bodyObj
  })
    .then(res => {
      console.log('Data inserted successfully', res);
      return res;
    })
    .catch(err => {
      console.error('Error inserting data', err.message);
      throw err;
    });
};

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

  export const  getUserDetails = async(phoneNo) =>{
    const query = `*[_type == "users" && phoneNo == "${phoneNo}"][0]`;
    const userDetails = await client.fetch(query).catch((error) => {
        console.log("Error while fetching user details");
    });
    return userDetails;
  }
 

export const updateUserData = (userDetails) =>{
 // console.log("--------updated---------data"+ JSON.stringify(userDetails));
  const details = userDetails;
// Define the document ID to update
const docId = details._id;

// Define the new data for the document
const newData = {
  // Update the fields that you want to change
  otp: details.otp
};

// Update the document with the new data
return client
  .patch(docId)
  .set(newData)
  .commit()
  .then((updatedDoc) => {
    console.log('Document updated:', updatedDoc);
  })
  .catch((error) => {
    console.error('Update failed:', error.message);
  });
}


export const createServiceRequestDetails = async(bodyObj) => {
  return await client.create({
    _type:  "serviceRequest",
    ...bodyObj
  })
    .then(res => {
      console.log('Data inserted successfully', res);
      return res;
    })
    .catch(err => {
      console.error('Error inserting data', err.message);
      throw err;
    });
};

export const generateServiceRequestId = async () => {
  // Query the database for the latest service request and get its ID.
  const query = '*[_type == "serviceRequest"] | order(serviceRequestId desc)[0]';
  const lastRequest = await client.fetch(query);

  // If there are no existing service requests, set the last ID to 0.
  const lastId = lastRequest ? parseInt(lastRequest.serviceRequestId.substr(2)) : 0;

  // Increment the last ID by 1 and pad it with zeros to make it a 4-digit number.
  const newId = ('00' + (lastId + 1)).slice(-3);

  // Return the new service request ID with 'SR' appended to the beginning.
  return 'SR' + newId;
}
export const fetchOrders = async (phoneNo) => {
  const query = `*[_type == "serviceRequest" && phoneNo == "${phoneNo}"]`;
  const orders = await client.fetch(query).catch((error) => console.log(error));
  return orders;
};

export default { fetchUserDetails, fetchCategories, createUser, insertData, uploadImage, deleteRow, getUserDetails, updateUserData, createServiceRequestDetails, generateServiceRequestId,fetchOrders }; 