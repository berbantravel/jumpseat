import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { EmbedOrBookmarkProps } from '@/types/models'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const EmbedDiv: React.FC<EmbedOrBookmarkProps> = ({ embedLink, embedImageUrl, embedAuthor, platform }) => {
    const [embedFailed, setEmbedFailed] = useState(false)
  
    const handleEmbedError = () => {
      setEmbedFailed(true)
    }
  
    return (
      <>
        {!embedFailed && embedLink ? (
          <div className="flex justify-center mt-4">
            <ReactPlayer url={embedLink} width="100%" height="480px" onError={handleEmbedError} />
          </div>
        ) : (
          <div className="flex-shrink-0 cursor-pointer">
            <Link href={embedLink}>
              <a target="_blank">
                <Image
                  src={embedImageUrl}
                  alt="Post image"
                  width={1000}
                  height={1000}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </a>
            </Link>
            <div className="min-w-0 flex-1 px-8 pb-6">
              <p className="captionMedium text-sm text-text-black-primary">
                <a className="cursor-pointer">{embedAuthor}</a>
              </p>
              <div>
                <div className="captionRegular text-text-black-secondary">
                  <a className="cursor-pointer">{platform}</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
  
  export default EmbedDiv