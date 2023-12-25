document.onreadystatechange = (e) => {
    console.dir(document.readyState)

    if(document.readyState !=="complete"){
        console.log("false")
    }else{


        const img = document.querySelector("img")
        //Global Element Size Function
        function getSize(item){
            return{
                w: item.offsetWidth,
                h: item.offsetHeight,
                x: item.offsetLeft,
                y:item.offsetTop
            }
        }


        console.dir(img)

       // Canvas Resize
       
       const canvas = document.querySelector("#canvas1")
       const ctx = canvas.getContext("2d")

       function resizeCanvas(){
        img.width = getSize(img).w
        img.Height = getSize(img).w
        canvas.width = getSize(img).w
        canvas.height = getSize(img).h
       }

        resizeCanvas()
       
       
        window.addEventListener("resize", () => {
        resizeCanvas()
       })

       const cellWidth = 30
       const cellArr = []

       class Cell{
        constructor(x,y){
            this.x = x
            this.y = y
            this.width = canvas.width / cellWidth
            this.height = canvas.height / cellWidth
            this.imgW = getSize(img).w
            this.imgH = getSize(img).h
            this.r = this.width / 2
            this.mouse = {
                x:0,
                y:0
            }
            this.listeners()
        }

        listeners(){
            document.addEventListener("mousemove", (e) => {
                console.log(e)
            })
        }

        draw(){
            ctx.beginPath()
            ctx.drawImage(
                img, 
                this.x +   (210+ this.mouse.x), this.y + (100 + this.mouse.y), this.width, this.height, 
                this.x, this.y, this.width, this.height
                )
        }

        pushArr(){
            resizeCanvas()
            for(let y = 0; y < canvas.height; y += this.height){
                for(let x = 0; x < canvas.width; x += this.width){
                    cellArr.push(new Cell(x, y))
                }
            }
        }

        init(){
            this.pushArr()
            cellArr.forEach(cell => {
                cell.draw()
            })
        }

       }

    const cell = new Cell()
    cell.init()

    }

}