import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
    projectId: 'jhnl5pei',
    dataset: 'production',
    token: 'skOTqyQRbTuIlCNkqDCio9nBU5EjlhYl6JJjCXZTIUMOVucwvXEj3ksAfMQGp5xXQtgXfu8C9Qq4v7WcnKtzeyBeSBmCZO815TNMQBnj2xJX6NyJBH5HLR4eTYK1skvqBswlmQmirnNI9XGyubZg7VZd5N6JNoCI7ZyeZHWkDCcMBxYLF8Gr', // or leave blank for public datasets
    apiVersion: 'v1',
    useCdn: false  // `false` if you want to ensure fresh data
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;