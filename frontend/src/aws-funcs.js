import { Storage } from "@aws-amplify/storage"
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { SkiResorts } from './models';

async function uploadResortsData() {
    try {
        await DataStore.save(
            new SkiResorts({
                "name": "Palisades",
                "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg",
                "latitude": 39.1906,
                "longitude": -120.2484,
                "website": "https://www.palisadestahoe.com/"
            })
        );
    }
    catch (err) { console.log(err) }
}

async function getResortsData() {
    try {
        const models = await DataStore.query(SkiResorts);
        console.log(models);
        return models
    }
    catch (err) { console.log(err) }
}

async function uploadImage(directory, file) {
    console.log("Uploading " + directory + "/" + file.name)
    const key = await Storage.put(directory + "/" + file.name, file, {
        level: 'private',
        progressCallback(progress) {
            console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
    });
}

async function downloadImage(filename) {
    try {
        const signedURL = await Storage.get(filename, {
            level: 'private',
        });
        console.log(signedURL)
        return signedURL
    }
    catch (err) { console.log(err) }
}

async function getList(directory) {
    try {
        const list = await Storage.list(directory + '/', { level: 'private' }) // for listing ALL files without prefix, pass '' instead
        console.log(list)
        return list
    }
    catch (err) { console.log(err) }
}

async function getImageURLs(directory) {
    try {
        const list = await Storage.list(directory + '/', { level: 'private' }) // for listing ALL files without prefix, pass '' instead
        console.log(list)
        const urls = []
        for (const file of list) {
            let url = await downloadImage(file.key)
            urls.push(url)
        }
        console.log(urls)
        return urls

    }
    catch (err) { console.log(err) }
}

async function getUser() {
    try {
        const user = await Auth.currentAuthenticatedUser();
        return user
    } catch {
        return false;
    }
}

async function signOut(navigate) {
    try {
        await Auth.signOut();
        navigate('/')
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
export { uploadImage, getList, downloadImage, getUser, signOut, getImageURLs, uploadResortsData, getResortsData }
