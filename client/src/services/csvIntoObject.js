

export const  intoCsv = (data) =>{
    console.log(data)
    const datas = data.split("\r")
    const header = datas[0].split(',')
    console.log(header)
    const headerTemplate =["nombre","curso","etapa"]

    if(JSON.stringify(header)=== JSON.stringify(headerTemplate)){
        const body = datas.slice(1,datas.length-1)
        const prueba = body[0].split(",")
        
        
        let result =[]
        
        body.forEach((element,indes) =>{   
            let aux = element.slice(2).split(',')
            let row = [aux[0]+","+aux[1].slice(0,-1),aux[2][0]+"º"+aux[2][2],aux[3]]
            row.forEach((elements,index)=>{
                
                    result[indes]={
                        ...result[indes],
                        [header[index]]:elements
                    }
                
            })
        })
        return result
    }else{
        return false
    }
        
    
    
    
}