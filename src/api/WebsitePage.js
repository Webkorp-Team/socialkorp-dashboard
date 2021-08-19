import { Map } from "immutable";
import { useEffect, useState, useMemo } from 'react';
import Api from "./Api";

class ExtendableMap{
  #map;
  constructor(data={}){
    if(data instanceof ExtendableMap)
      return data;
    this.#map = Map(data);
  }
  set(key,value){
    const newMap = this.#map.set(key,value);
    if(newMap === this.#map)
      return this;
    return new this.constructor(newMap);
  }
  get(key){ return this.#map.get(key); }
  toObject(){ return this.#map.toObject(); }
  keys(){ return this.#map.keys(); }
}

class Section extends ExtendableMap{
  constructor(data){
    super(data);
  }
  get(elementName){
    return super.get(elementName);
  }
  set(elementName,value){
    return super.set(elementName,value);
  }
  export(){
    return this.toObject();
  }
}

const emptySection = new Section({});

class WebsitePage extends ExtendableMap{
  constructor(data){
    if(data instanceof WebsitePage)
      return data;
    const keys = data.keys ? data.keys() : Object.keys(data);
    const sections = {};
    for(const sectionName of keys)
      sections[sectionName] = new Section(data[sectionName]);
    super(sections);
  }
  getSectionNames(){
    return this.keys();
  }
  getSection(sectionName){
    return this.get(sectionName) || emptySection;
  }
  setSection(sectionName,section){
    return this.set(sectionName,section);
  }
  export(){
    const data = {};
    for(const sectionName of this.getSectionNames())
      data[sectionName] = this.getSection(sectionName).export();
    return data;
  }
}

async function getRawPageData(name){
  return await Api.get('/website/page',{name});
}

export function staticPageDataToProps(pageName){
  return async () => ({props:{staticPageData:await getRawPageData(pageName)}});
}

export function useLivePage(name,staticData){
  const staticPage = useMemo(()=>(
    staticData ? new WebsitePage(staticData) : null
  ),[staticData]);

  const [page, setPage] = useState(staticPage);

  useEffect(()=>{
    if(!name)
      return;
    getRawPageData(name).then(data => {
      setPage(new WebsitePage(data));
    });
  },[name]);

  return page;
}
