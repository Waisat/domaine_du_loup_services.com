

export class CarouselClass {
    constructor(mainCarousel, currentCarousel, folderImg,  numberCarouselImg) {
        this.folderImg=folderImg;
        this.numberImg= numberCarouselImg;
        this.mainCarousel= mainCarousel;
        this.currentCarousel= currentCarousel;
        console.log('Folder Img', this.folderImg);
        this.generateCarousel( this.mainCarousel, this.currentCarousel, this.folderImg, this.numberImg);
    }

    generateCarousel(mainCarousel, currentCarousel, folderImg, numberImg){
        const grabIdCarousel= document.getElementById('carousel');
        const createBoard= document.createElement('div');
        let newArray=[];
        let rand;

        let secondVerified=[];


        createBoard.id='mainSlides';
        grabIdCarousel.style.width='80%';
        grabIdCarousel.style.margin='0 auto';
        grabIdCarousel.appendChild(createBoard);
        createBoard.style.width='100%';
        createBoard.style.display='flex';
        createBoard.style.flexDirection='row';
        createBoard.style.justifyContent='space-between';
        createBoard.style.margin='0 auto';

        for(let i=0; i<=numberImg -1; i++){
            const createUl= document.createElement('ul');
            const createImg= document.createElement('img');
            createImg.id='img/'+i;
            createUl.id= 'ul/'+ i;

            if(numberImg === 4 ){
                createUl.style.padding = '0'
                createUl.style.width='20%';
                createImg.style.height='150px';
                createImg.style.borderRadius='10px';


            } else if( numberImg ===2){
                createUl.style.width='40%';
                createImg.style.height='10vh';
                createImg.style.borderRadius='10px';

            }


            let randomNum= this.getRandomImage(folderImg.length-1);
            let checkVerif= newArray.filter(el => (el.id === randomNum.toString()));

                if(checkVerif.length !==0 ){
                    do {
                        rand= Math.floor(Math.random()*((folderImg.length-1)));
                        secondVerified= newArray.filter(el => (el.id === rand.toString()));


                    }while (secondVerified.length !== 0 );


                    newArray.push(folderImg[rand]);

                } else {
                    newArray.push(folderImg[randomNum]);

                }

                createBoard.appendChild(createUl);
            for(let loopLi=1; loopLi <= 2; loopLi++){
                const createLi= document.createElement('li');
                createLi.style.listStyle='none';
                createLi.className='liInfo'+ loopLi;
                createUl.appendChild(createLi);

                if(createLi.className==='liInfo1'){
                    const createElementH3= document.createElement('h4');
                    createLi.appendChild(createElementH3);
                    createElementH3.className='h3Title';
                    createElementH3.style.color='#F4B894';
                    createElementH3.style.margin='0 auto';
                    createElementH3.style.textAlign='center';
                    createElementH3.style.paddingBottom='5%';
                    createElementH3.style.width='100%'
                    createElementH3.style.textTransform ='uppercase'
                    createElementH3.innerHTML=newArray[i].name;

                    if(numberImg === 2){
                        createElementH3.style.fontSize='50%'
                    }

                }

                if(createLi.className==='liInfo2'){
                    const createHref= document.createElement('a');
                    createHref.href= newArray[i].link;
                   // createHref.textContent=newArray[i].name;
                    createHref.className='href';
                    createImg.src='ressources/carousel/'+newArray[i].img;
                    createImg.className='imgOfCarousel';
                    createImg.title=newArray[i].name;
                    createImg.alt=newArray[i].name;
                    createImg.style.width='100%';
                    createLi.appendChild(createHref);
                    createHref.appendChild(createImg)
                }


            }

        }

        // make a loop trough the number of the array object key to create <li>
        this.setTimeOutCarousel(mainCarousel,  newArray, numberImg, folderImg);

    }

    setTimeOutCarousel(mainCarousel,newArray, numberImg, folderImg){
        let timeOut=   setTimeout(()=>this.generateNewCarousel(mainCarousel,newArray, numberImg, folderImg), 5000)
   //  this.mouseHoverStop(timeOut, mainCarousel, newArray, numberImg, folderImg)
    }


    generateNewCarousel(mainCarousel,  previousCarousel, numberImg, folderImg){
        let currentCarousel=[];
        let randNewArray;
        let checkCarouselAgain;
        let checkCurrentNewAgain;
        const getLi= document.getElementsByClassName('liInfo1');
        const getSecondLi= document.getElementsByClassName('liInfo2');
        const getH3= document.getElementsByClassName('h3Title');
        const getHref= document.getElementsByClassName('href');
        const getImg= document.getElementsByClassName('imgOfCarousel');
        for(let i=0; i <= previousCarousel.length-1; i++){
            mainCarousel.push(previousCarousel[i])
        }



        if(mainCarousel.length >=16 ){

            mainCarousel=[];
        }

        for(let b=0; b <= numberImg -1; b++){

            let randomCarousel= this.getRandomImageNew(folderImg.length-1);
            let checkCarousel= mainCarousel.filter(el=>(el.id=== randomCarousel.toString()));
            let checkCurrentDouble= currentCarousel.filter(el=>(el.id=== randomCarousel.toString()));
            if(checkCarousel.length || checkCurrentDouble.length!==0){
                do{
                    randNewArray= Math.floor(Math.random()* (folderImg.length)); //(retrait du -1 sur length)
                    checkCarouselAgain= mainCarousel.filter(el=>(el.id === randNewArray.toString()));
                    checkCurrentNewAgain=currentCarousel.filter(el=>(el.id === randNewArray.toString()));

                }while (checkCurrentNewAgain.length  || checkCarouselAgain.length !== 0);
                currentCarousel.push(folderImg[randNewArray]);


            }else{
                currentCarousel.push(folderImg[randomCarousel]);

            }

            for(let z=1; z <= 2; z++){
                if(getLi[b].className==='liInfo1'){

                    getH3[b].innerHTML=currentCarousel[b].name;

                }
                if(getSecondLi[b].className==='liInfo2'){
                    getHref[b].href= currentCarousel[b].link;
                    getImg[b].textContent=currentCarousel[b].name;
                    getImg[b].src='ressources/carousel/'+currentCarousel[b].img;
                    getImg[b].title=currentCarousel[b].name;
                    getImg[b].alt=currentCarousel[b].name;

                   this.fadeIn(getImg[b], undefined, undefined)
                }

            }


        }

        this.setTimeOutCarousel(mainCarousel, currentCarousel, numberImg, folderImg)

    }

    setFadeIn(objectToFade, opacityReturn, stockInterval){
       let convertOpacityReturn=  parseInt(opacityReturn);

        if(convertOpacityReturn <=1){
            let stockInterval=   setTimeout(()=>this.fadeIn(objectToFade, opacityReturn, stockInterval), 100)
        }
        else {
            clearTimeout(stockInterval)
        }

    }

    fadeIn(objectToFade, opacityReturn, stockInterval) {
        let opacityStart=0;
        const Increase=0.1;
        let totalOpacity;
        if(opacityReturn === undefined){
            totalOpacity= opacityStart + Increase;

                objectToFade.style.opacity = totalOpacity.toString();

            this.setFadeIn(objectToFade, totalOpacity);


        }else{
            totalOpacity= opacityReturn + Increase;
            objectToFade.style.opacity=totalOpacity.toString();
            this.setFadeIn(objectToFade, totalOpacity, stockInterval)
        }

    }


    getRandomImage(maximumRandom, minimumRandom=0){
        return Math.floor(Math.random()*(maximumRandom-minimumRandom)+ minimumRandom)
    }

    getRandomImageNew(maximumRandom, minimumRandom=0){
        return Math.floor(Math.random()*(maximumRandom-minimumRandom)+ minimumRandom)
    }

    mouseHoverStop(timeOutCarousel, mainCarousel, newArray, numberImg, folderImg){
        let mouseLeave=false;
        const getDivCarousel= document.getElementById('carousel');

        getDivCarousel.addEventListener('mouseenter', function () {
            clearTimeout(timeOutCarousel);

        });


            getDivCarousel.addEventListener('mouseleave', ()=>this.generateNewCarousel(mainCarousel, newArray, numberImg, folderImg))

    }





}
