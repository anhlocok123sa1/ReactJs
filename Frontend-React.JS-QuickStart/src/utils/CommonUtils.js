class CommonUtils {
    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    static bufferToBase64(buffer) {
        return new Buffer(buffer,'base64').toString('binary');
    }
    
}

export default CommonUtils;