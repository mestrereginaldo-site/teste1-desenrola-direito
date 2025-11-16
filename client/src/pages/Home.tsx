import Hero from "@/components/home/Hero";
import QuickAccess from "@/components/home/QuickAccess";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import RecentArticles from "@/components/home/RecentArticles";
import ArticlesList from "@/components/home/ArticlesList";
import Newsletter from "@/components/home/Newsletter";
import Solutions from "@/components/home/Solutions";
import AdPlaceholder from "@/components/shared/AdPlaceholder";

export default function Home() {
  return (
    <div>
      <Hero />
      <QuickAccess />
      
      {/* Ad banner horizontal após QuickAccess */}
      <div className="container mx-auto px-4 py-8">
        <AdPlaceholder format="horizontal" className="mx-auto" />
      </div>
      
      <FeaturedCategories />
      <RecentArticles />
      
      {/* Ad banner quadrado entre componentes */}
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <AdPlaceholder format="square" />
      </div>
      
      <ArticlesList />
      <Newsletter />
      <Solutions />
      
      {/* Ad banner horizontal antes do footer */}
      <div className="container mx-auto px-4 py-8">
        <AdPlaceholder format="horizontal" className="mx-auto" />
      </div>
    </div>
  );
}
