import { useEffect, useState } from 'react';
import * as S from './styles';

const value = (v)=>(
  v === undefined || v === null ? v : v?.toString?.()
);

export default function TextField({
  type="text",
  label=null,
  options: optionsFunc=[],
  ...props
}){

  const [options, setOptions] = useState(
    Array.isArray(optionsFunc) ? optionsFunc : []
  );

  useEffect(()=>{
    if(typeof optionsFunc !== 'function')
      return;
    Promise.resolve(optionsFunc()).then(value => {
      setOptions(value);
    });
  },[optionsFunc]);

  const field = (
    <S.TextField
      {...(
        type === 'textarea' ? {
          as: 'textarea'
        } : type === 'select' ? {
          as: 'select',
          'data-value': value(props.defaultValue) || value(props.value) || "",
          onInput: e => {
            e.target.dataset.value = e.target.value;
          },
          children: <>
            <option value="" disabled>{label || !props.placeholder?'':props.placeholder}</option>
            {options.map(option => (
              <option key={option.value||option} value={option.value||option}>{option.label||option.value||option}</option>
            ))}
          </>
        } : {
          type
        }
      )}
      {...props}
    />
  );

  return label ? (
    <S.Label data-type={type}>
      <span>{label}</span>
      {field}
    </S.Label>
  ) : field;
}
