'use client';
import PopupContent from "@/components/popup";
import axios from "axios";
import { useEffect, useState } from "react";
import WeatherData from "@/components/weatherData";
import { InitialData } from "@/constants";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function Home() {
  const [speedData, setSpeedData] = useState<any[]>([]);
  const [weatherPreferenceList, setWeatherPreferenceList] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Load state from localStorage if it exists, otherwise use InitialData
  useEffect(() => {
    const savedData = localStorage.getItem('weatherPreferenceList');
    if (savedData) {
      setWeatherPreferenceList(JSON.parse(savedData));
    } else {
      setWeatherPreferenceList(InitialData);
    }
    setLoading(false);
  }, []);

  // Save the weatherPreferenceList to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('weatherPreferenceList', JSON.stringify(weatherPreferenceList));
    }
  }, [weatherPreferenceList, loading]);

  const handleClose = () => {
    setModalOpen(false);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(weatherPreferenceList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWeatherPreferenceList(items);
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while loading
  }

  return (
    <div className="grid justify-items-center w-full h-screen grid-rows-[max-content]">
      <div className="grid justify-items-center items-center content-center">
        <div className="grid grid-cols-[1fr_1fr] items-center justify-items-start w-full mt-[4rem]">
          <h1 className="text-[xx-large] font-[fantasy]">Weather Tracker</h1>
          <div className="container mx-auto text-right">
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-full bg-primary px-6 py-3 text-base font-medium text-white"
            >
              Add
            </button>
            {modalOpen && (
              <PopupContent 
                modalOpen={modalOpen} 
                handleClose={handleClose} 
                setWeatherPreferenceList={setWeatherPreferenceList}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="weather-list">
            {(provided:any) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {weatherPreferenceList.map((item, index) => (
                  <Draggable key={item.name} draggableId={item.name} index={index}>
                    {(provided:any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <WeatherData item={item} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
