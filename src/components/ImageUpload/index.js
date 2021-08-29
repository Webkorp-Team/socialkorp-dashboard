import { useCallback, useState } from 'react';
import * as S from './styles';
import imageBlobReduce from 'image-blob-reduce';

const reducer = imageBlobReduce();
reducer._create_blob = function (env) {
  return this.pica.toBlob(env.out_canvas, 'image/jpeg', 0.85)
    .then(function (blob) {
      env.out_blob = blob;
      return env;
    });
};

const pngReducer = imageBlobReduce();
pngReducer._create_blob = function (env) {
  return this.pica.toBlob(env.out_canvas, 'image/png', 0.85)
    .then(function (blob) {
      env.out_blob = blob;
      return env;
    });
};

export default function ImageUpload({
  label=null,
  accept="image/*",
  readOnly=false,
  defaultValue,
  ...props
}){

  const [value, setValue] = useState(defaultValue);
  const [src, setSrc] = useState(defaultValue);

  const handleChange = useCallback((e)=>{
    if(!e.target.files[0])
      return;
    const pngOnly = (accept === 'image/png');
    ( pngOnly ? pngReducer : reducer ).toBlob(e.target.files[0],{max:1600}).then(resizedImage => {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        setSrc(URL.createObjectURL(resizedImage));
        setValue(reader.result);
      }, false);
      reader.readAsDataURL(resizedImage);
    });
  },[accept]);

  return <>
    <S.Label>
      <span>{label}</span>
      <S.Input onChange={handleChange} type="file" accept={accept} readOnly={readOnly} />
      {value ? <S.Preview src={src}/> : <S.HelpText>Select file</S.HelpText>}
    </S.Label>
    <S.Input type="hidden" value={value} {...props}/>
  </>;
}
