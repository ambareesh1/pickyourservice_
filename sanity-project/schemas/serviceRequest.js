import client from '@sanity/client'

const generateServiceRequestId = async () => {
  const query = '*[_type == "serviceRequest"] | order(serviceRequestId desc)[0]'
  const lastRequest = await client.fetch(query)
  const lastId = lastRequest ? parseInt(lastRequest.serviceRequestId.substr(2)) : 0
  const newId = ('00' + (lastId + 1)).slice(-3)
  return 'SR' + newId
}
export default {
  name: 'serviceRequest',
  title: 'Service Request',
  type: 'document',
  fields: [
    {
      name: 'serviceRequestId',
      title: 'Service Request ID',
      type: 'string',
      readOnly: false,
    },
    {
      name: 'requestBy',
      title: 'Request By',
      type: 'string',
    },
    {
      name: 'requestById',
      title: 'Request By ID',
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
      type: 'number',
      options: {
        step: 0.01,
      },
    },
    {
      name: 'GST',
      title: 'GST',
      type: 'number',
      options: {
        step: 0.01,
      },
    },
    {
      name: 'otherServiceTax',
      title: 'Other Service Tax',
      type: 'number',
      options: {
        step: 0.01,
      },
    },
    {
      name: 'discount',
      title: 'Discount',
      type: 'number',
    },
    {
      name: 'totalCost',
      title: 'Total Cost',
      type: 'number',
      options: {
        step: 0.01,
      },
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
          type: 'object',
          fields: [
            {
              name: 'service',
              title: 'Service Name',
              type: 'string',
            },
            {
              name: 'categoryIndex',
              title: 'category Index',
              type: 'number',
            },

            {
              name: 'serviceIndex',
              title: 'serviceIndex',
              type: 'number',
            },

            {
              name: 'count',
              title: 'No of items',
              type: 'number',
            },
            {
              name: 'price',
              title: 'price',
              type: 'number',
              options: {
                step: 0.01,
              },
            },
            {
              name: 'isActive',
              title: 'Is Active',
              type: 'boolean',
            },
            {
              name: 'image',
              title: 'Service Images',
              type: 'image',
            },
          ],
        },
      ],
    },
    {
      name: 'assignedTo',
      title: 'Assigned To',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
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
            },
          ],
        },
      ],
    },
    {
      name: 'isActive',
      title: 'isActive',
      type: 'boolean',
    },
    {
      name: 'status',
      title: 'status',
      type: 'string',
    },{
      name: 'requestRaisedOn',
      title: 'Request Raised On',
      type: 'datetime',
    }
  ],
}
