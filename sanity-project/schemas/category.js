// category.js

export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image'
        },
        {
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean'
        },
        {
            name: 'subCategories',
            title: 'Sub Categories',
            type: 'array',
            of: [
                {
                    name: 'subCategory',
                    title: 'Sub Category',
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            title: 'Name',
                            type: 'string'
                        }, {
                            name: 'image',
                            title: 'Image',
                            type: 'image'
                        },
                        {
                            name: 'isActive',
                            title: 'Is Active',
                            type: 'boolean'
                        },
                        {
                            name: 'details',
                            title: 'Details',
                            type: 'array',
                            of: [
                                {
                                    name: 'item',
                                    title: 'Item',
                                    type: 'object',
                                    fields: [
                                        {
                                            name: 'service',
                                            title: 'Service',
                                            type: 'string'
                                        },
                                        {
                                            name: 'price',
                                            title: 'Price',
                                            type: 'number'
                                        },
                                        {
                                            name: 'image',
                                            title: 'Image',
                                            type: 'image'
                                        },
                                        {
                                            name: 'isActive',
                                            title: 'Is Active',
                                            type: 'boolean'
                                        }, {
                                            name: 'isSqFeetIncluded',
                                            title: ' is SqFeet Included',
                                            type: 'boolean'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
