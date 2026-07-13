import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

/**
 * Candidate introduction video embed for the QR funnel.
 *
 * Renders a hosted YouTube embed when `youtubeId` is set, otherwise a
 * self-hosted <video> from `src`. Swap the source in one place
 * (INTRO_VIDEO in src/constants/site.js) when the campaign delivers the
 * real video. Campaign videos must ship with English captions — enable
 * them on the final upload.
 */
const CampaignVideo = ({ youtubeId, src, poster, title, className }) => {
  return (
    <div
      className={cn(
        'aspect-video w-full overflow-hidden rounded-2xl border-[1.5px] border-paper-78/30 bg-black',
        className
      )}
    >
      {youtubeId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video src={src} poster={poster} controls preload="metadata" className="h-full w-full">
          Your browser does not support embedded video.
        </video>
      )}
    </div>
  )
}

CampaignVideo.propTypes = {
  youtubeId: PropTypes.string,
  src: PropTypes.string,
  poster: PropTypes.string,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
}

CampaignVideo.defaultProps = {
  youtubeId: '',
  src: '',
  poster: '',
  className: '',
}

export default CampaignVideo
