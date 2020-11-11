import {getResponse, genGrid} from "./routes.utils";

export const getRoute = async (data) =>{
    const {startPoint} = data;
    const {segments,adj} = genGrid(startPoint)

    let startId = 0;
    for(let i = 0; i< segments.length; i++){
        const node = segments[i].nodes[0]
        if(node.lat === startPoint.lat && node.lon === startPoint.lon){
            startId = i;
            break;
        }
    }

    const next = []
    let current = startId
    for(let i = 0; true; i++){
        const options= adj[current].length
        if(options===0) break
        const decision = Math.floor((Math.random() * options))
        next.push(adj[current][decision])
        current = adj[current][decision]
    }

    const route = {
        segments:segments,
        start: startId,
        next,
    }
    return{
        error: null,
        route: getResponse(route)
    }
}
