export const genGrid = (startPoint) =>{
    const nodes = []
    const size = {lat: 150, lon: 50}
    const step = {lat: 1,lon: 1}
    for(let lat = startPoint.lat - (size.lat / 2); lat <= startPoint.lat + (size.lat / 2) ; lat += step.lat){
        const row = []
        for(let lon = startPoint.lon - (size.lon / 2); lon <= startPoint.lon + (size.lon / 2) ; lon += step.lon){
            row.push({lat,lon})
        }
        nodes.push(row)
    }
    const segments = []
    const adj = []
    for(let y = 0; y < nodes.length; y++){
        for(let x = 0; x < nodes[y].length; x++){
            let vertical;
            if(x%2){
                vertical = y + 1
            }else{
                vertical = y-1
            }
            if(nodes[vertical] && nodes[vertical][x]){
                segments.push({entry:nodes[y][x],exit: nodes[vertical][x]})
            }
            let horizontal;
            if(y%2){
                horizontal = x + 1
            }else{
                horizontal = x-1
            }
            if(nodes[y] && nodes[y][horizontal]){
                segments.push({entry:nodes[y][x],exit: nodes[y][horizontal]})
            }
        }
    }
    for(let i = 0; i< segments.length; i++){
        const adjI = []
        for(let j = 0; j < segments.length; j++){
            if(segments[i].exit === segments[j].entry){
                adjI.push(j)
            }
        }
        adj.push(adjI)
    }
    return {
        segments: segments.map(segment => {
            return {
                nodes: [segment.entry,segment.exit]
            }
        }),
        adj}
}

export const getResponse = (route) =>{
    return{
        ...route,
        segments:segmentsToDeltas(route.segments),
    }
}

const segmentsToDeltas = (segments) =>{
    let current= {lat:0,lon:0}
    const deltas = []
    segments.forEach(segment=>{
        const deltaNodes = []
        segment.nodes.forEach(node =>{
            const deltaLat = node.lat - current.lat
            const deltaLon = node.lon - current.lon
            deltaNodes.push(deltaLat)
            deltaNodes.push(deltaLon)
            current = node
        })
        deltas.push({
            ...segment,
            nodes:deltaNodes
        })
    })

    return deltas
}
