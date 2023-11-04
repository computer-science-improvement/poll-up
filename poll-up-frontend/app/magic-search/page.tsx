import MagicSearch from '@/components/magic-search';
import UserCard from '@/components/user-card';

type MagicSearchPageProps = {
  params: Record<string, string>;
  searchParams: {
    prompt?: string;
  };
};

export default function MagicSearchPage({
  searchParams: { prompt },
}: MagicSearchPageProps) {
  console.log(prompt);
  return (
    <>
      {/*<MagicSearch />*/}
      <UserCard />
    </>
  );
}
