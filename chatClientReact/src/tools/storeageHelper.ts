type saveKeys = ("sketch")

export const saveSessionData = (
    data:any, 
    key: saveKeys): void => 
        sessionStorage.setItem(JSON.stringify(data), key);


export const loadSessionData= (    
    key: saveKeys): any  => 
         JSON.parse(sessionStorage.getItem(key) as string);
    

    
