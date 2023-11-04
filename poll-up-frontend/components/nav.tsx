import Link from 'next/link';

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

import { ROUTES } from '@/lib/routes';

export default function Nav() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className='font-bold text-inherit'>Poll up</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link color='foreground' href={ROUTES.magicSearch}>
            Magic Search
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href={ROUTES.home}>
            Game
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Button
            as={Link}
            color='primary'
            href={ROUTES.pullUp}
            variant='shadow'
          >
            Pull Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
