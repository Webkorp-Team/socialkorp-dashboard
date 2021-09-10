import { useCallback } from 'react';
import Card from 'components/Card';
import * as S from './styles';
import TextField from 'components/TextField';
import ImageUpload from 'components/ImageUpload';
import { Fragment } from 'react';

const properties = [{
  name: 'title',
  label: 'Page title',
  type: 'text',
},{
  name: 'description',
  label: 'Page description',
  type: 'textarea',
},{
  name: 'picture',
  label: 'Featured picture',
  type: 'file',
  accept: 'image/*'
}];

export default function Meta({
  meta={},
  commonMeta={},
  onChange=(meta)=>{},
  visible=false,
}){

  const handleChange = useCallback((e)=>{
    const newMeta = {
      ...meta,
      [e.target.name]: e.target.value,
    };
    onChange(newMeta);
  },[onChange,meta]);

  return (
    <S.MetaTabLayout data-visible={visible}>
      <Card
        header="Meta tags"
      >
        <S.CardLayout>
          {properties.map(property => (
            property.type === 'hidden' ? (
              <input
                type="hidden"
                name={property.name}
                value={meta[property.name]||''}
              />
            ) :
            property.type === 'padding' ? <div/> :
            property.type === 'file' ? (
              property.accept.match(/^image\b/) ? <Fragment key={property.name}>
                <ImageUpload
                  accept={property.accept}
                  label={property.label}
                  name={property.name}
                  value={meta[property.name]||''}
                  placeholder={commonMeta[property.name]}
                  onChange={handleChange}
                />
                <div/>
              </Fragment> : null
            ):(
              <TextField
                key={property.name}
                type={property.type}
                label={property.label}
                name={property.name}
                value={meta[property.name]||''}
                placeholder={commonMeta[property.name]}
                onChange={handleChange}
              />
            )
          ))}
          
        </S.CardLayout>
      </Card>
    </S.MetaTabLayout>
  );
}
