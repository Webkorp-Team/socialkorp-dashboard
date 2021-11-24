import { useCallback, useRef, useState, useEffect } from 'react';
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
  value: extValue,
  placeholder,
  onChange,
  ...props
}){

  const [value, setValue] = useState(defaultValue || extValue);
  const [src, setSrc] = useState(value);

  const refPreviousValue = useRef();
  useEffect(()=>{
    if(extValue === undefined)
      return;
    setValue(extValue);
    if(refPreviousValue.current !== extValue){
      setSrc(extValue);
      refPreviousValue.current = extValue;
    }
  },[extValue]);

  const refHiddenInput = useRef();

  useEffect(()=>{
    const listener = onChange;
    const input = refHiddenInput.current;
    input.addEventListener('change',listener);
    return ()=>{
      input.removeEventListener('change',listener);
    };
  },[onChange]);

  const updateValue = useCallback((src,value)=>{
    setSrc(src);
    setValue(value);
    
    refHiddenInput.current.value = value;
    refHiddenInput.current.dispatchEvent(new Event('change'));
  },[]);

  const handleChange = useCallback((e)=>{
    if(!e.target.files[0])
      return;
    const noResize = ['image/svg','image/svg+xml'].includes(accept);
    const pngOnly = (accept === 'image/png');
    if(noResize){
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        const src = URL.createObjectURL(e.target.files[0]);
        const value = reader.result;
        updateValue(src,value);
      }, false);
      reader.readAsDataURL(e.target.files[0]);
    }else{
      ( pngOnly ? pngReducer : reducer ).toBlob(e.target.files[0],{max:1600}).then(resizedImage => {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          const src = URL.createObjectURL(resizedImage);
          const value = reader.result;
          updateValue(src,value);
        }, false);
        reader.readAsDataURL(resizedImage);
      });
    }
  },[accept]);

  return <>
    <S.Label>
      <span>{label}</span>
      <S.Input onChange={handleChange} type="file" accept={accept} readOnly={readOnly} />
      {(src || placeholder) ? <S.Preview src={src || placeholder} data-dimmed={placeholder && !src}/> : <S.HelpText>Select file</S.HelpText>}
    </S.Label>
    <S.Input ref={refHiddenInput} type="hidden" value={value} {...props}/>
  </>;
}
