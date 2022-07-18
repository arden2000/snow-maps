import { Storage } from "@aws-amplify/storage"
import { Auth } from 'aws-amplify';

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
    const signedURL = await Storage.get(filename, {
        level: 'private',
    });
    console.log(signedURL)
}

async function getList(directory) {
    try {
        const list = await Storage.list(directory + '/', { level: 'private' }) // for listing ALL files without prefix, pass '' instead
        console.log(list)
        return list
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
export { uploadImage, getList, downloadImage, getUser, signOut }
