"use client";

import { SafeUser } from '@/app/types';
import React from 'react'
import Categories from './categories';
import Container from './container';
import Logo from './logo';
import Search from './search';
import UserMenu from './user-menu';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className='border-b-[1px]'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                    <Logo />
                    <Search />
                    <UserMenu currentUser={currentUser} />
                </div>
            </Container>
        </div>
        <Categories />
    </div>
  )
}

export default Navbar;