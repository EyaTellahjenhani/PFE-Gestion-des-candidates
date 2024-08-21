import React from "react";
import { Breadcrumb } from "flowbite-react";


const Breadcrumbe = ({pageName1,pageName2,pageName3}) => {
  return (
    <Breadcrumb aria-label="Default breadcrumb example" className="mt-2">
      <Breadcrumb.Item>Pages</Breadcrumb.Item>
      <Breadcrumb.Item href="#">{pageName1}</Breadcrumb.Item>
      {pageName2 && <Breadcrumb.Item>{pageName2}</Breadcrumb.Item>} 
      {pageName3 && <Breadcrumb.Item>{pageName3}</Breadcrumb.Item>} 
      
    </Breadcrumb>
  );
};

export default Breadcrumbe;
