import Link from 'next/link';

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

import { ROUTES } from '@/lib/routes';
import MagicSearch from '@/components/magic-search';

export default function Nav() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link color='foreground' href={ROUTES.HOME}>
          Poll up
        </Link>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <MagicSearch />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Button
            as={Link}
            color='primary'
            href={ROUTES.PULL_UP}
            variant='shadow'
          >
            Pull Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
