import React, { useEffect, useState } from 'react'
import './playlists.css'
import { Input } from 'antd';
import { FaBeer } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
const Playlists = () => {
   
    const [playlists, setPlaylists] = useState();
    const [token, setToken] = useState();
    const [search,setSearch] = useState();
    const [localItems, setLocalItems] = useState();
    const notify = () => toast("Wow so easy!");
    
    useEffect(()=>{
        let LS = JSON.parse(localStorage.getItem('values')); 
       console.log("ls",LS)
    },[])

    useEffect(()=> {
       
        const fetchTheToken = async ()=>{
            const clientId = process.env.REACT_APP_CLIENT_ID;
            const clientSecret = process.env.REACT_APP_CLIENT_SECRET
            return await fetch(`https://accounts.spotify.com/api/token`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded', 
                    'Accept' : 'application/json',
                    'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
                },
                body: 'grant_type=client_credentials'
            })
            .then(response =>response.json())
            .catch(err =>console.log(err))
        }
        
        const fetchThePlaylists = async(data)=>{
            console.log("incomeing token",data);
            return await fetch(`https://api.spotify.com/v1/browse/featured-playlists?country=IN&
            locale=hi_IN&timestamp=2014-10-23T09%3A00%3A00.000Z&limit=10&offset=5`,{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + data
                },
               
            }).then(response =>response.json())
            
        }

        
        fetchTheToken().then(data => {
           
              console.log("access_token",data.access_token)
                fetchThePlaylists(data.access_token).then(data => {

                    setPlaylists(data);

                    console.log("data",data)});
                    console.log("token is",data)});
                    console.log("playlists",playlists);

    },[])

    /* const getSTate = ()=> {
        let LS = JSON.parse(localStorage.getItem('values'));
        console.log("sdf",playlists);
    } */
   
    
    console.log("playlists",playlists);
    const dragStart = (e)=>{
         e.dataTransfer.setData('card',e.target.id);
        const doc = document.getElementById('card_item_id');
        console.log("dragStart",e.target);
    }

    /* const touchMove = (e)=>{
        const doc = document.getElementById('card_item_id');
        console.log("doc",doc);
        const touchLocation = e.targetTouches[0];
        doc.style.left = touchLocation.pageX + 'px';
        doc.style.right = touchLocation.pageY + 'px';
      
    } */
    const onDragOverr = (e) => {
            /* console.log(e) */
            e.stopPropagation();
            e.preventDefault();
        }

        const onFileDrop = (e) => {

            const card = e.dataTransfer.getData('card')
            console.log(card)
 
            e.stopPropagation();
            e.target.appendChild(document.getElementById(card))
            toast();
            let arr =[];
            console.log("localItems",localItems)
            if(localItems !== undefined ){
                console.log('prev',localItems)
                localItems.map(value => {
                    arr.push(value);
                });
               
                 console.log("running if")
                 arr.push(card);
                 setLocalItems(arr);
                 console.log(JSON.stringify(localItems));
                
                
                 localStorage.setItem("values",JSON.stringify(arr));
            }
            else{
                console.log("else")
                arr.push(card);
                console.log("arr",arr[0]);
                arr.map(value =>{
                    setLocalItems([value]);
                    localStorage.setItem("values",JSON.stringify(value));
                })
               
                /* localStorage.setItem("values",JSON.stringify(localItems)); */
            }
        }
 
          const  onDragEnter = (e) => {
            console.log(e)
            e.stopPropagation();
          }
  
         const  onChangeHandler = (e) => {
              setSearch(e.target.value);
          }

         return (
        <div className="wrapper">
       
            <div className="playlists">
              <div className="title">Featured Playlists</div>
               <div className="body_container">
                <div className="search_container">
                <ToastContainer />
                  <p>Search by Language</p>
                  
                  <Input onChange={e=>onChangeHandler(e)} placeholder={"Basic usage"} />
                 
                </div>
                <div className="card_container">
               { playlists === null || playlists === undefined?
                 <h1>No playlists</h1> :
                   
                 playlists.playlists.items.map(playlist =>     
                { return (
                    <div style={{cursor:'pointer'}} id={playlist.id} key={playlist.id} onDragStart={(e)=>dragStart(e)}  draggable="true" className="card_item">
                    <div style={{backgroundImage:`url(${playlist.images[0].url})`,backgroundSize:"cover",height:'auto',backgroundRepeat:'no-repeat'}} className="image_container"></div>
                    <div className="card_content"><div>{playlist.name}</div></div>
                    </div>)
                    }
                )
                       
                }
                </div>
               </div>
            </div>
            <div className="local">
                <div className='title'>Local playlists</div>
                <div className="body_container_right">
                <div>
                
                <div id="card_container_right" onDragEnter={(e)=>{onDragEnter(e)}} onDragOver={(e)=>{onDragOverr(e)}}
                 onDrop={e=>{onFileDrop(e)}}  className="card_container_right">
                
                
                </div>
                </div> 
               </div>
            </div>
        </div>
    )
}

export default Playlists

/*  onTouchMove={(e)=>{touchMove(e)}}  onTouchStart={e=>dragStart(e)} */


/* 
if(localStorage.getItem('values') !== null) { */
    /*   const values = JSON.parse(localStorage.getItem('values')).map(e=>{
          return e;
      }) */
     /*  console.log('values',values);
       arr = [values];
        */
      /* arr.push(card); */
     /*  console.log("sdfsd",JSON.parse(localStorage.getItem('values')));
      let pr = [] ;
      const parsed =JSON.parse(localStorage.getItem('values'));
      console.log("parsed", parsed[1])
      console.log("parsed",typeof parsed);
      let values =  Object.values(parsed);
      for (let key in parsed){
          if(parsed.hasOwnProperty(key)){
            console.log(`${key} : ${parsed[key]}`);
            pr.push(parsed[key]);
          }
       }
      console.log("parsed",values) */
     /*  arr = [parsed]; */
     /* console.log("arr pr",pr) */
     /*  arr.push(card);
      const str = JSON.stringify(arr);
      console.log("arr",JSON.stringify(arr));
      console.log("strt",JSON.parse(str));
      localStorage.setItem("values",str); */
 /*  }
  else{
       arr = [card];
       const str = JSON.stringify(arr[0])
       console.log(str)
       console.log(JSON.parse(str));
       localStorage.setItem("values",str);
  }
   */


  
  
/*  localStorage.setItem("values",str); */
 