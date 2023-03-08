export default {
    name: 'users',
    type: 'document',
    title: 'user details',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            name: 'email',
            type: 'string',
            title: 'email'
        },
        {
            name: 'phoneNo',
            type: 'string',
            title: 'phone No'
        },
        {
            name: 'address',
            type: 'string',
            title: 'address'
        },

        {
            name: 'password',
            type: 'string',
            title: 'password'
        },
        {
            name: 'area',
            type: 'string',
            title: 'area'
        },
        {
            name: 'pincode',
            type: 'string',
            title: 'pincode'
        },
        {
            name: 'profileimage',
            title: 'profileimage',
            type: 'image'
        },
        {
            name: 'isSupplier',
            type: 'boolean',
            title: 'is Supplier'
        },
        {
            name: 'otp',
            type: 'string',
            title: 'otp'
        },
        {
            name: 'pickCreditPoints',
            type: 'string',
            title: 'pickCreditPoints'
        },
        {
            name: 'isActive',
            type: 'boolean',
            title: 'isActive'
        }

    ]
}

