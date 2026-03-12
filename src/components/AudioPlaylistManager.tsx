import { useEffect } from 'react'
import { useAudioPlayer } from '@/contexts/AudioPlayerContext'
import { fetchEvents } from '@/data/events'

const EVENT_AUDIO_URLS: Record<string, { english: string; spanish: string }> = {
  '1': {
    english: 'https://dl.dropboxusercontent.com/scl/fi/nhobtjkvkgrv8ktdy24za/Release_the_Kraken_Raves_and_Reefs.m4a?rlkey=nm6tnwm5503oc2hy3l3hbb27c&st=zpys66d7&dl=1',
    spanish: 'https://dl.dropboxusercontent.com/scl/fi/ebu4tv1czqziz63f963c2/Ciencia_y_dise-o_de_Release_the_Kraken.m4a?rlkey=83h9jrvi6m38xqxp3eabq32nx&st=hqa9vmvs&dl=1'
  },
  '2': {
    english: 'https://res.cloudinary.com/dw3lf8roj/video/upload/v1773288866/Why_Heavy_Noise_Cures_Modern_Anxiety_pwleyp.mp4',
    spanish: 'https://res.cloudinary.com/dw3lf8roj/video/upload/v1773288899/M%C3%BAsica_oscura_como_herramienta_de_supervivencia_rsgftd.mp4'
  },
  '3': {
    english: 'https://dl.dropboxusercontent.com/scl/fi/uf03itkdfagqfns0g213c/Dark_Alternative_Collision_in_Brownsville.m4a?rlkey=d5lo2j62obd2uw4ee10cfvgrc&st=0qd52thg&dl=1',
    spanish: 'https://res.cloudinary.com/dw3lf8roj/video/upload/v1773288899/M%C3%BAsica_oscura_como_herramienta_de_supervivencia_rsgftd.mp4'
  },
  '4': {
    english: 'https://dl.dropboxusercontent.com/scl/fi/eq6782sfui2kzxkgkx68p/German_industrial_legends_Das_Ich_in_Brownsville.m4a?rlkey=d3h7uusk4xrb0s8svwtpvhy0q&st=eiyf5gzo&dl=1',
    spanish: 'https://dl.dropboxusercontent.com/scl/fi/2m0layi9i35jm6v12bdx1/Das_Ich_conquista_Brownsville.m4a?rlkey=ltdfvqvbmzasmsgz0ffzbvzka&st=qs3xw2n2&dl=1'
  },
  '5': {
    english: 'https://dl.dropboxusercontent.com/scl/fi/uj6huaplmys2ng3gj1x52/Brujeria-s_Masked_Deathgrind_Rebellion_in_Brownsville.m4a?rlkey=ybz1dzzuesuvprjvydvc7luly&st=90m3vuel&dl=1',
    spanish: 'https://dl.dropboxusercontent.com/scl/fi/kj1oecb8ozom3vj01jd5q/Brujer-a_y_el_mito_del_metal_narcosat-nico.m4a?rlkey=d1osfqc36f2lpr0imkf3xu0f6&st=p8pb4lof&dl=1'
  },
  '7': {
    english: 'https://dl.dropboxusercontent.com/scl/fi/vrxbmgiazx2hf19iji86f/Brownsville_s_First_Friday_Goth_Night_Sanctuary.m4a?rlkey=yve8smahs8oqryym4p4qpvwqn&st=04sk6q2f&dl=1',
    spanish: 'https://dl.dropboxusercontent.com/scl/fi/kz8064avmqaqtcxeeul3m/G-ticos_impulsando_el_centro_de_Brownsville.m4a?rlkey=2vgqop1s503pnadvneqqaor9o&st=7dretta6&dl=1'
  },
  '8': {
    english: 'https://dl.dropboxusercontent.com/scl/fi/8qa406tsq8hwhj5thmqog/Underground_Techno_Cures_Sunday_Scaries.m4a?rlkey=0ns4ltliqd0gel0n7mxu86imp&st=c9ltwtp5&dl=1',
    spanish: 'https://dl.dropboxusercontent.com/scl/fi/3jtxdy6k6hixoomqax7ir/Terapia_de_techno_dominical_en_Brownsville.m4a?rlkey=s9sxxi8cgh7bu25631z4l1f6o&st=0zxner97&dl=1'
  }
}

const MAIN_AUDIO_URLS = {
  english: 'https://res.cloudinary.com/dw3lf8roj/video/upload/v1773202298/The_Kraken_Lounge_s_Radical_South_Texas_Sanctuary_1_vtjdx2.mp4',
  spanish: 'https://res.cloudinary.com/dw3lf8roj/video/upload/v1773202453/The_Kraken_Lounge_oasis_cultural_de_Brownsville_unssbh.mp4'
}

const sheetCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQf5qoMtNgc7kQTbmw_pJxKaWioKThrFdyp-3ZZt79gOiNz_pfYQf4f1lB81aGQzuQ3CqB_6xyFIyNL/pub?output=csv'

export function AudioPlaylistManager() {
  const { setPlaylist } = useAudioPlayer()

  useEffect(() => {
    async function loadPlaylist() {
      try {
        const events = await fetchEvents(sheetCsvUrl)
        
        const tracks = []
        
        tracks.push({
          title: 'The Kraken Lounge Overview',
          url: MAIN_AUDIO_URLS.english,
          language: 'english' as const,
          eventTitle: 'The Kraken Lounge Overview'
        })
        
        tracks.push({
          title: 'Resumen del Kraken Lounge',
          url: MAIN_AUDIO_URLS.spanish,
          language: 'spanish' as const,
          eventTitle: 'Resumen del Kraken Lounge'
        })
        
        events.forEach(event => {
          if (EVENT_AUDIO_URLS[event.id]) {
            const audioUrls = EVENT_AUDIO_URLS[event.id]
            
            tracks.push({
              title: event.title,
              url: audioUrls.english,
              language: 'english' as const,
              eventId: event.id,
              eventTitle: event.title
            })
            
            tracks.push({
              title: event.title,
              url: audioUrls.spanish,
              language: 'spanish' as const,
              eventId: event.id,
              eventTitle: event.title
            })
          }
        })
        
        setPlaylist(tracks)
      } catch (error) {
        console.error('Failed to load audio playlist:', error)
      }
    }
    
    loadPlaylist()
  }, [setPlaylist])

  return null
}
