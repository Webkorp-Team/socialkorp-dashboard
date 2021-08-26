import admin from 'firebase-admin';

const bucket = admin.storage().bucket();

export default class Storage{

  static write(filename,buffer,contentType){ // returns public url
    return new Promise((resolve,reject)=>{

      const file = bucket.file(filename);

      const stream = file.createWriteStream({resumable:false});

      stream.write(buffer);

      stream.on('finish',()=>{
        file.makePublic().then(()=>{

          if(!contentType)
            resolve(file.publicUrl());
          else{
            file.setMetadata({contentType}).then(()=>{
              resolve(file.publicUrl());
            }).catch(error => {
              reject(error);
            })
          }

        }).catch(error => {
          reject(error);
        })
      });

      stream.on('error',error => {
        reject(error);
      });

      stream.end();
    });
  }
  static read(filename){
    return bucket.file(filename).download();
  }
  static getUrl(filename){
    return bucket.file(filename).publicUrl();
  }
  static async writeDataUrl(filename,dataUrl){
    if(!dataUrl.match(/^data:[^;]*;base64,/))
      throw new Error('Not a base64 data URL');

    const contentType = dataUrl.match(/:.*;/)[0].replace(/[:;]/g,'');

    const data = dataUrl.slice(dataUrl.indexOf(',')+1);

    const buffer = Buffer.from(data,'base64');

    return await this.write(filename,buffer,contentType);
  }

}
