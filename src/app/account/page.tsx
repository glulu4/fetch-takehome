"use client";

import {useEffect, useState} from "react";
import {LogOut} from "lucide-react";
import toast from "react-hot-toast";
import {useDogs} from "@/hooks/useDogs";
import {useAuth} from "@/context/AuthContext";

import FavoriteModal from "@/components/FavoriteModal";
import SelectedDogsModal from "@/components/SelectedDogs";

import LocationSearch from "@/components/LocationSearch";
import FilterBar from "@/components/FilterBar";
import DogsGrid from "@/components/DogsGrid";
import {PAGE_SIZE} from "@/types/types";
import Pagination from "@/components/Pagination";
import SelectedZipCodes from "@/components/SelectedZipCodes";

const Page = () => {
  const {logout} = useAuth();
  const {
    dogs,
    breeds,
    favorites,
    match,
    loading,
    locations,
    locationLoading,
    selectedZipCodes,
    locationSearch,
    fetchDogs,
    fetchLocations,
    addToFavorites,
    findMatch,
    setLocationSearch,
    toggleZipCode,
    removeFromFavorites,
    totalDogs
  } = useDogs();

  const [selectedBreed, setSelectedBreed] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const [viewFavModalVisible, setViewFavModalVisible] = useState(false);
  const [favModalVisible, setFavModalVisible] = useState(false);
  const [matchModalLoading, setMatchModalLoading] = useState(false);

  useEffect(() => {
    fetchDogs({
      breed: selectedBreed,
      zipCodes: selectedZipCodes,
      sort: sortOrder,
      page: currentPage,
    });
  }, [selectedBreed, sortOrder, currentPage, selectedZipCodes]);

  useEffect(() => {
    if (locationSearch.city || locationSearch.state) {
      const timeout = setTimeout(() => fetchLocations(locationSearch), 300);
      return () => clearTimeout(timeout);
    }
  }, [locationSearch]);

  const handleMatch = async () => {
    if (favorites.length === 0) return;
    setFavModalVisible(true);
    setMatchModalLoading(true);
    await findMatch();
    setMatchModalLoading(false);
  };

  const handleAddToFavorites = (dog: any) => {
    addToFavorites(dog);
    toast.success(`${dog.name} added to favorites`);
  };

  return (
    <div className="container mx-auto p-4 space-y-10">
      {/* Logout button */}
      <button onClick={logout} className="absolute top-8 right-8">
        <LogOut size={24} color="black" />
      </button>

      <h1 className="text-3xl md:text-4xl font-bold mb-4 pt-10 text-center">
        Find Your Perfect Dog
      </h1>

      {/* Location Search */}
      <LocationSearch
        city={locationSearch.city}
        stateVal={locationSearch.state}
        setLocationSearch={setLocationSearch}
        locations={locations}
        locationLoading={locationLoading}
        selectedZipCodes={selectedZipCodes}
        toggleZipCode={toggleZipCode}
      />

      {/* Breed / Sort / Favorites / Match */}
      <FilterBar
        breeds={breeds}
        selectedBreed={selectedBreed}
        setSelectedBreed={(val) => setSelectedBreed(val)}
        sortOrder={sortOrder}
        setSortOrder={(val) => setSortOrder(val)}
        favoritesCount={favorites.length}
        onViewFavorites={() => setViewFavModalVisible(true)}
        onFindMatch={handleMatch}
      />

      {/* Display Selected Zip Codes */}
      <SelectedZipCodes
        selectedZipCodes={selectedZipCodes}
        onRemoveZipCode={toggleZipCode}
      />

      {/* Dogs Grid */}
      <DogsGrid
        dogs={dogs}
        loading={loading}
        onFavorite={handleAddToFavorites}
      />


      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalDogs={totalDogs}
        pageSize={PAGE_SIZE}
      />

      <FavoriteModal
        visible={favModalVisible}
        loading={matchModalLoading}
        matchedDog={match}
        onClose={() => setFavModalVisible(false)}
      />

      {/* View Favorites (SelectedDogs) */}
      <SelectedDogsModal
        visible={viewFavModalVisible}
        loading={false}
        dogs={favorites}
        onClose={() => setViewFavModalVisible(false)}
        onRemoveDog={removeFromFavorites} // toggling works if you handle logic in context
        onFindMatch={handleMatch}
      />
    </div>
  );
};

export default Page;



