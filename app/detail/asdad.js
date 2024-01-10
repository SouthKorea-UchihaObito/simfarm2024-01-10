// import { connectDB } from '@/util/database';
// import { ObjectId } from 'mongodb';
// export default async function handler(req, res) {
//   try {
//     if (req.method === 'POST') {
//       const db = (await connectDB).db('forum');
//       const post = await db
//         .collection('post')
//         .findOne({ _id: new ObjectId(req.body.postId) });
//       const isLike = await db
//         .collection('postLike')
//         .findOne({ likeUser: req.body.userName });
//       if (isLike) {
//         return res.status(400).json('이미 좋아요 누른 게시글입니다.');
//       }
//       const result = await db.collection('postLike').insertOne({
//         likeUser: req.body.userName,
//         postId: new ObjectId(req.body.postId),
//       });
//       res.status(200).json('좋아요 성공');
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json('error:', error);
//   }
// }

// //PostLike.js 입니다. 클라이언트 컴포넌트로 좋아요버튼 분리했어요

// 'use client';
// import { useEffect } from 'react';
// const PostLike = ({ postId, userName }) => {
//   const onLikeBtnClick = () => {
//     fetch('/api/post/like', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         postId,
//         userName,
//       }),
//     }).then((data) => {
//       if (data.status === 200) {
//       } else if (data.status === 400) {
//         alert('이미 좋아요 누른 게시물입니다.');
//       }
//     });
//   };
//   return (
//     <div className='post-like-btn' onClick={() => onLikeBtnClick()}>
//       <span>👍</span>
//     </div>
//   );
// };


// << 좋아요 컴포넌트 >>
'use client'
import { useEffect, useState } from "react"
 
export default function Like(props) {
    let [like, setLike] = useState(0);
    let [heart, setHeart] = useState('🤍')

    useEffect(() => {
        fetch(`/api/likeapi/b?id=${props._id}`)
        .then((r)=>{
            return r.json()
        })
        .then((result)=>{
            setLike(result);
        })
    },[like])

   useEffect(() => {
        fetch(`/api/likeapi/c?id=${props._id}`)
        .then((r)=>{
            return r.json()
        })
        .then((result)=>{
            setHeart(result);
        })
    },[heart])
    return (
        <div>
            <span onClick={()=>{
                fetch(`/api/likeapi/a?id=${props._id}`)
                setLike()
                setHeart()
            }}>{heart} </span>
            <span>{like}</span>
        </div>
    )
}

// << 서버 API a - DB저장 >>
import { getServerSession } from "next-auth";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
    let session = await getServerSession(요청, 응답,authOptions);
    if (session) {
        let client = await connectDB;
        let db = client.db('forum');
        let 찾는거 = await db.collection('like').findOne({name:session.user.name, parent:new ObjectId(요청.query.id)});
        if (찾는거 == null) {
            await db.collection('like').insertOne({name:session.user.name, parent:new ObjectId(요청.query.id)});
            응답.status(200).json('좋아요');
        } else {
            await db.collection('like').deleteOne({name:session.user.name, parent:new ObjectId(요청.query.id)});
            응답.status(200).json('좋아요취소');
        }
    } else {
        응답.status(500).json('로그인이 필요합니다.')
    }
}
// << 서버 API b - 좋아요 개수 가져오기 >>
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
    let client = await connectDB;
    let db = client.db('forum');
    let like = await db.collection('like').find({parent:new ObjectId(요청.query.id)}).toArray();
    응답.status(200).json(like.length);
}
// << 서버 API c - 좋아요 이모티콘 변경>>
import { getServerSession } from "next-auth";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
    let session = await getServerSession(요청, 응답,authOptions);
    if (session) {
        let client = await connectDB;
        let db = client.db('forum');
        let 찾는거 = await db.collection('like').findOne({name:session.user.name, parent:new ObjectId(요청.query.id)});
        if (찾는거 == null) {
            응답.status(200).json('🤍')
        } else {
            응답.status(200).json('❤️‍🔥')
        }
    } else {
        응답.status(500).json('🤍')
    }
}