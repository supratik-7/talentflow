import React from "react";
import useCandidatesStore from "../store/candidatesStore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const stages = ["applied","screen","tech","offer","hired","rejected"];

export default function CandidatesKanban() {
  const { candidates, updateStage } = useCandidatesStore();

  const onDragEnd = (res) => {
    if (!res.destination) return;
    const id = res.draggableId;
    const newStage = res.destination.droppableId;
    updateStage(id, newStage);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-6 gap-2">
        {stages.map(stage => (
          <Droppable droppableId={stage} key={stage}>
            {(provided)=>(
              <div ref={provided.innerRef} {...provided.droppableProps} className="p-2 bg-base-200 rounded h-[600px] overflow-y-auto">
                <h2 className="font-bold text-primary mb-2">{stage}</h2>
                {candidates.filter(c=>c.stage===stage).slice(0,10).map((c,i)=>(
                  <Draggable draggableId={String(c.id)} index={i} key={c.id}>
                    {(prov)=>(
                      <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}
                        className="card bg-base-100 shadow-sm p-2 mb-2">
                        <p className="font-medium">{c.name}</p>
                        <p className="text-xs opacity-70">{c.email}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
