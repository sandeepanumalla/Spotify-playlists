import React, { useEffect, useState } from 'react'
import './playlists.css'
import { Input } from 'antd';
import { FaBeer } from 'react-icons/fa';


const Playlists = () => {

    const [playlists, setPlaylists] = useState();
    const [token, setToken] = useState();

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
            .then(data =>{console.log(data)
                setPlaylists(data);
            })
        }
        fetchTheToken().then(data => {
           /*  setToken(data); */
           console.log("access_token",data.access_token)
                fetchThePlaylists(data.access_token).then(data => {
                   
                    console.log("data",data)});
            console.log("token is",data)});
        
    },[])

    const dragStart = (e)=>{
         e.dataTransfer.setData('card',e.target.id);
        const doc = document.getElementById('card_item_id');
        console.log("dragStart",e.target);
    }

    const touchMove = (e)=>{
        const doc = document.getElementById('card_item_id');
        console.log("doc",doc);
        const touchLocation = e.targetTouches[0];
        doc.style.left = touchLocation.pageX + 'px';
        doc.style.right = touchLocation.pageY + 'px';
       /*  console.log("touchMove",e.targetTouches[0]); */
    }
    const onDragOverr = (e) => {
            console.log(e)
            e.stopPropagation();
            e.preventDefault();
        }

        const onFileDrop = (e) => {

            const card = e.dataTransfer.getData('card')
            console.log(card)

            e.stopPropagation();
            e.target.appendChild(document.getElementById(card));
           
        }
          const  onDragEnter = (e) => {
            console.log(e)
            e.stopPropagation();
          }
  
/*      console.log("names",playlists.playlists.items); */
     /* if(playlists !== null ){
         console.log(playlists.playlists.items[0].images[0].url)
     } */
         return (
        <div className="wrapper">
            <div className="playlists">
              <div className="title">Featured Playlists</div>
               <div className="body_container">
                <div className="search_container">
                 
                  <p>Search by Language</p>
                  
                  <Input placeholder={"Basic usage"} />
                 
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