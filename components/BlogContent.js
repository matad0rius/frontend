import BlockContent from '@sanity/block-content-to-react';
import React from 'react'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
// import InstagramPost from 'react-instagram-embed'
import HighlightCode from 'components/HighlightCode'; 
import { urlFor } from 'lib/api';

const serializers = {
    types: {
      code: ({node: {language, code, filename}}) => {
        return (
          <HighlightCode language={language}>
            {code}
            <div className="code-filename">{filename}</div>
          </HighlightCode>
        )
      },
      youtube: ({node}) => {
        const { url } = node
        const id = getYouTubeId(url)
        return (<YouTube videoId={id} />)
      },
      // instagramPost: ({ value }) => {
      //   const { url } = value;
      //   return (
      //     <InstagramPost
      //       url={url}
      //       maxWidth={480}
      //       containerTagName="div"
      //       injectScript
      //     />
      //   );
      // }
      image: ({node: {asset, alt, position = 'center'}}) => {

        return (
          <div className={`blog-image blog-image-${position}`}>
            <img src={urlFor(asset).height(300).fit('max').url()} />
            <div className="image-alt">{alt}</div>
          </div>
        )
      }
    }
  }


const BlogContent = ({content}) =>
  <BlockContent
    serializers={serializers} 
    blocks={content}
  />

export default BlogContent;