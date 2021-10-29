import { useEffect, useState } from "react";
import { getListIndex } from "./use-list-index";

function initialProps(props){
  return JSON.parse(
    JSON.stringify(props)
  ).map(prop => ({
    ...prop,
    options: prop.options?.list ? [] : prop.options
  }));
}

export default function useSelectOptionsFromLists(inputProperties){
  const [outputProperties, setOutputProperties] = useState(null);
  const [counter, setCounter] = useState(0);

  useEffect(()=>{
    setOutputProperties(initialProps(
      inputProperties
    ));
    setCounter(x=>x+1);
  },[inputProperties]);

  useEffect(()=>{
    if(counter == 0)
      return;
    inputProperties.forEach((prop,idx) => {
      if(!prop.options?.list)
        return;
      getListIndex(prop.options.list).then(listIndex => {
        setOutputProperties(currentProps => {
          const newProps = [...currentProps];
          newProps[idx] = {
            ...currentProps[idx],
            options: listIndex.map(item => ({
              label: item[prop.options.label],
              value: item[prop.options.value]
            }))
          };
          return newProps;
        })
      });
    });
  },[counter,/*inputProperties*/]);// only use updated inputProperties value when counter changes

  return outputProperties || initialProps(inputProperties);
}
