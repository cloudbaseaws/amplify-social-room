//Add {type Schema} and next line add import {generateClient}

import { type Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { defaultRoom } from "./utils";
import { useEffect, useState } from "react";
//Add this line below
const client = generateClient<Schema>();
export function RoomSelector({
  currentRoomId,
  onRoomChange,
}: {
  currentRoomId: string;
  onRoomChange: (roomId: string) => void;
}) {
  const [rooms, setRooms] = useState<Schema["Room"]["type"][]>([defaultRoom]);

  useEffect(() => {
    // Add observeQuery code here set up a live feed inside the useEffect
    const sub = client.models.Room.observeQuery().subscribe({ next:(data)=>{setRooms([defaultRoom,...data.items])

    }
  })
  return (
    ()=> sub.subscribe()
  
    <>
      <select
        onChange={(e) => onRoomChange(e.target.value)}
        value={currentRoomId}
      >
        {rooms.map((room) => (
          <option value={room.id} key={room.id}>
            {room.topic}
          </option>
        ))}
      </select>
      <button
        onClick={async () => {
          // Add create Room logic here
        }}
      >
        [+ add]
      </button>
    </>
  );
}
