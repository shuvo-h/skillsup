import { ReactNode } from "react";
import { TUserPaths } from "../types";
import { NavLink } from "react-router-dom";

type TSidebarItem = {
    key: string;
    label: ReactNode;
    children?: TSidebarItem[];
  };

  
export const sidebarItemsGenerator = (navBarItems:TUserPaths[],role:string) =>{
    const sidebarItems = navBarItems.reduce((result:TSidebarItem[], item) => {
        if (item.path && item.name) {
          result.push({ 
              key: item.name, 
              label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>
          });
        }
        if (item.children) {
          result.push({ 
              key: item.name, 
              label: item.name, 
              children: item.children.map(child=>{
                  return {
                      key: child.name,
                      label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
                  }
              }) 
          });
        }
      
        return result;
      }, [] );
      
      return sidebarItems;
}