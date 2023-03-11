import client from '@sanity/client';

const generateServiceRequestId = async () => {
  const query = '*[_type == "serviceRequest"] | order(serviceRequestId desc)[0]';
  const lastRequest = await client.fetch(query);
  const lastId = lastRequest ? parseInt(lastRequest.serviceRequestId.substr(2)) : 0;
  const newId = ('00' + (lastId + 1)).slice(-3);
  return 'SR' + newId;
}
export default {
  name: 'serviceRequest',
  title: 'Service Request',
  type: 'document',
  fields: [
    {
      name: 'serviceRequestId',
      title: 'Service Request ID',
      type: 'number',
      readOnly: true,
      validation: (Rule) => Rule.required(),
      options: {
        // Generate the ID automatically when creating a new document
        defaultValue: () => generateServiceRequestId(),
      },
    },
    {
      name: 'requestById',
      title: 'Request By ID',
      type: 'string',
    },
    {
      name: 'requestBy',
      title: 'Request By',
      type: 'string',
    },
    {
      name: 'phoneNo',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'latitude',
      title: 'Latitude',
      type: 'string',
    },
    {
      name: 'longitude',
      title: 'Longitude',
      type: 'string',
    },
    {
      name: 'pickDateToservice',
      title: 'Pick Date for Service',
      type: 'string',
    },
    {
      name: 'problemDescription',
      title: 'Problem Description',
      type: 'string',
    },
    {
      name: 'subTotal',
      title: 'Subtotal',
      type: 'string',
    },
    {
      name: 'GST',
      title: 'GST',
      type: 'string',
    },
    {
      name: 'otherServiceTax',
      title: 'Other Service Tax',
      type: 'string',
    },
    {
      name: 'discount',
      title: 'Discount',
      type: 'string',
    },
    {
      name: 'totalCost',
      title: 'Total Cost',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'serviceItems',
      title: 'Service Items',
      type: 'array',
      of: [
        {
          name: 'categoryId',
          title: 'Category ID',
          type: 'string',
        },
        {
          name: 'subCategoryId',
          title: 'Subcategory ID',
          type: 'string',
        },
        {
          name: 'serviceId',
          title: 'Service ID',
          type: 'string',
        },
        {
          name: 'serviceName',
          title: 'Service Name',
          type: 'string',
        }
      ],
    },
    {
      name: 'assignedTo',
      title: 'Assigned To',
      type: 'array',
      of: [
        {
          name: 'id',
          title: 'ID',
          type: 'string',
        },
        {
          name: 'patnerName',
          title: 'Patner Name',
          type: 'string',
        },
        {
          name: 'patnerphone',
          title: 'patner Phone',
          type: 'string',
        },
        {
          name: 'patneremail',
          title: 'patner Email',
          type: 'string',
        },
        {
          name: 'aadhar',
          title: 'Aadhar',
          type: 'string',
        },
        {
          name: 'rating',
          title: 'Rating',
          type: 'string',
        },

        {
          name: 'serviceCharge',
          title: 'Service Charge',
          type: 'string',
        },
        {
          name: 'transactionId',
          title: 'Transaction ID',
          type: 'string',
        }
      ],
    },
  ],
}
