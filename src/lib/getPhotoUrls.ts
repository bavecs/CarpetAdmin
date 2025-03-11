export default function getImages(kepekszama:number, folder:string, cikkszam:string) {


    if ( folder[folder.length] === "/") folder.slice(0, -1); 

    cikkszam = cikkszam.toUpperCase()


    let images: string[] = []

    for(let i = 1; i <= kepekszama; i++) {
        images.push(folder+"/"+cikkszam+"_"+i+".png")
    }


    return images
}