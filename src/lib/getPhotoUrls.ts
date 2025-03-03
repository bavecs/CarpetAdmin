export default function getImages(kepekszama:number, folder:string, cikkszam:string) {


    if ( folder[folder.length] === "/") folder.slice(0, -1); 


    let images: string[] = []

    for(let i = 1; i <= kepekszama; i++) {
        images.push(folder+"/"+cikkszam+"_"+i+"_png")
    }

    return images
}