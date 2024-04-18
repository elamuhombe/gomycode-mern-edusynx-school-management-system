import React from 'react';

import Topbar from '../../components/shared/Topbar';
import LeftMenu from '../../components/dashboard/shared/LeftMenu';
import BackButton from '../../components/BackButton';
import SearchFamilyNumber from '../../components/dashboard/admin/SearchFamilyNumber';

const AddStudent: React.FC = () => {
  return (
    <div className="container mx-auto mt-5">
      <div className="top-0 z-0">
        <Topbar title="Admin Dashboard" />
      
      </div>
      <div className='flex'>
        <LeftMenu />
        <div className='mx-auto'>
          <BackButton />
          <h1 className="text-2xl font-bold mb-5">Add Student</h1>
        
        <SearchFamilyNumber/> </div>
        </div>
        </div>
      
     
 
  );
};

export default AddStudent;