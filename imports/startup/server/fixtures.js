/* Fill the database and the blockchain with sample data
 if this is a test environment
*/

import { Meteor } from 'meteor/meteor'
import { Videos } from '../../api/videos.js'
import { Playlists } from '../../api/playlists.js'
import { deployParatiiContracts } from '/imports/lib/ethereum/helpers.js'
import { watchEvents } from '/imports/api/transactions.js'
import { setRegistryAddress } from '/imports/lib/ethereum/contracts.js'
import { web3 } from '/imports/lib/ethereum/web3.js'

// const videoList = [
//   {
//     _id: '1',
//     title: 'Nature Power - Surf Nature Power',
//     description: 'A video about nature, power, surfing and lots of natural power...',
//     thumb: '/img/cover/thumb1-img.png',
//     duration: '15:30',
//     price: 22,
//     uploader: {
//       address: '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
//       name: 'Pole Pole Channel',
//       avatar: '/img/icon/android-chrome-256x256.png'
//     },
//     stats: {
//       likes_percentage: 84,
//       views: 15524,
//       likes: 2345555,
//       dislikes: 7
//     },
//     tags: ['NATURE'],
//     src: 'https://raw.githubusercontent.com/Paratii-Video/paratiisite/master/imagens/Paratii_UI_v5_mobile.webm',
//     mimetype: 'video/webm'
//   },
//   {
//     _id: '2',
//     title: 'Longboard Northern California Jorney',
//     description: 'Longboard Expression Session at NC before the final Pro 2016! Best barrels ever seen in a longboard!!',
//     thumb: '/img/cover/thumb2-img.png',
//     duration: '03:22',
//     price: 0,
//     uploader: {
//       address: '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
//       name: 'John Doe',
//       avatar: '/img/icon/android-chrome-256x256.png'
//     },
//     stats: {
//       likes_percentage: 98,
//       views: 2244245,
//       likes: 2345555,
//       dislikes: 7
//     },
//     tags: ['NATURE', 'LONGBOARDING'],
//     src: 'https://raw.githubusercontent.com/Paratii-Video/paratiisite/master/imagens/Paratii_UI_v5_mobile.webm',
//     mimetype: 'video/webm'
//   },
//   {
//     _id: '3',
//     title: 'Webtorrent  Experiment',
//     description: 'Trying with webtorrent...',
//     thumb: '/img/cover/thumb2-img.png',
//     duration: '03:22',
//     price: 22,
//     uploader: {
//       address: '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
//       name: 'Mike Torrent',
//       avatar: '/img/icon/android-chrome-256x256.png'
//     },
//     stats: {
//       likes_percentage: 98,
//       views: 2244245,
//       likes: 2345555,
//       dislikes: 7
//     },
//     tags: ['WEBTORRENT', 'FUN AND PROFIT'],
//     src: 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent',
//     mimetype: 'video/mp4'
//   },
//   {
//     _id: '4',
//     title: 'Around the Block - Teaser 1',
//     description: 'First teaser of Around the Block ',
//     thumb: '/img/cover/teaser1.jpg',
//     duration: '03:22',
//     price: 0,
//     uploader: {
//       address: '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
//       name: 'Paratii',
//       avatar: '/img/icon/android-chrome-256x256.png'
//     },
//     stats: {
//       likes_percentage: 98,
//       views: 100,
//       likes: 500,
//       dislikes: 7
//     },
//     tags: ['WEBTORRENT', 'AROUND THE BLOCK'],
//     src: 'magnet:?xt=urn:btih:978c3df6e8e3562b18613e36086bf2592093db90&dn=Around+The+Block+Series+-+Teaser+1+-+Sergio+Lerner.mp4&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com',
//     mimetype: 'video/mp4'
//   },
//   {
//     _id: '5',
//     title: 'Around the Block - Teaser 16',
//     description: 'Another teaser of Around the Block ',
//     thumb: '/img/cover/teaser16.jpg',
//     duration: '03:22',
//     price: 14,
//     uploader: {
//       address: web3.eth.accounts[2],
//       name: 'Paratii',
//       avatar: '/img/icon/android-chrome-256x256.png'
//     },
//     stats: {
//       likes_percentage: 98,
//       views: 100,
//       likes: 500,
//       dislikes: 7
//     },
//     tags: ['WEBTORRENT', 'AROUND THE BLOCK'],
//     src: 'magnet:?xt=urn:btih:826bfc8069e71418c215179f12546460e3364b5a&dn=Around_The_Block_Teaser_16.mp4&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com',
//     mimetype: 'video/mp4'
//   },
//   {
//     _id: '6',
//     title: 'Around The Block Series - Teaser 1 - Sergio Lerner',
//     description: 'Around the Block is a humane account of the most fascinating social experiment ever played in the internet, in the form of a documentary series. This is just a teaser. Rollout of 6 free episodes begins in Autumn 2017. ',
//     thumb: '/img/cover/teaser1.jpg',
//     duration: '01:57',
//     price: 0,
//     uploader: {
//       address: '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
//       name: 'Paratii',
//       avatar: '/img/icon/android-chrome-256x256.png'
//     },
//     stats: {
//       likes_percentage: 98,
//       views: 2244245,
//       likes: 2345555,
//       dislikes: 7
//     },
//     tags: ['IPFS', 'Around The Block'],
//     // src: '/ipfs/QmeqDeRWSghNQwheSt6R8bB7wd2tgAo1KYT4VGLsbDdgWx',
//     src: 'https://gateway.ipfs.io/ipfs/QmayHsEJfu1Pq5q1k3c9f9z14fh6AyJsam4LFbSQYWMXZt',
//     mimetype: 'video/mp4'
//
//   }, {
//     _id: '7',
//     title: 'Around The Block Series - Teaser 16 - Alex Van De Sande',
//     description: 'IPFS EXAMPLE video',
//     thumb: '/img/cover/teaser16.jpg',
//     duration: '01:46',
//     price: 0,
//     uploader: {
//       address: '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
//       name: 'Paratii',
//       avatar: '/img/icon/android-chrome-256x256.png'
//     },
//     stats: {
//       likes_percentage: 98,
//       views: 2244245,
//       likes: 2345555,
//       dislikes: 7
//     },
//     tags: ['IPFS', 'Around The Block'],
//     // src: '/ipfs/QmR6QvFUBhHQ288VmpHQboqzLmDrrC2fcTUyT4hSMCwFyj',
//     src: 'https://gateway.ipfs.io/ipfs/QmcSHvFsGEU36viAkXo5PAkz1YgsorzT5LXR8uAnugJ7Hg',
//     mimetype: 'video/mp4'
//
//   }, {
//     _id: '8',
//     title: '[IPFS] Big Buck Bunny',
//     description: 'IPFS EXAMPLE video',
//     duration: '01:00',
//     price: 0,
//     uploader: {
//       address: '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
//       name: 'Paratii',
//       avatar: '/img/icon/android-chrome-256x256.png'
//     },
//     stats: {
//       likes_percentage: 98,
//       views: 2244245,
//       likes: 2345555,
//       dislikes: 7
//     },
//     tags: ['IPFS', 'Fragmented Mp4'],
//     src: '/ipfs/QmXUPZZhDLnrPaTR7eLPVFMDgHZBNhEAX6yzULe6F4cBdV',
//     // src: '/ipfs/QmR6QvFUBhHQ288VmpHQboqzLmDrrC2fcTUyT4hSMCwFyj',
//     mimetype: 'video/mp4'
//   }, {
//     _id: '9',
//     title: '[IPFS][browser-optimized] Big Buck Bunny',
//     description: 'IPFS EXAMPLE video, NOTE: you have to upload the frag_bunny.mp4 file using the browser uploader to seed this file.',
//     duration: '01:00',
//     price: 0,
//     uploader: {
//       address: '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
//       name: 'Paratii',
//       avatar: '/img/icon/android-chrome-256x256.png'
//     },
//     stats: {
//       likes_percentage: 98,
//       views: 2244245,
//       likes: 2345555,
//       dislikes: 7
//     },
//     tags: ['IPFS', 'Fragmented Mp4', 'Browser to Browser stream'],
//     // src: '/ipfs/Qmb3eFpLCNGg1NrPcY5RcHhznibVGuPT28fzZQ7egTzv37',
//     src: '/ipfs/QmQ1HYmQa9Ucn3F9bMmGH2jB7qJG6WZEKBmbTPqySiq33g',
//     mimetype: 'video/mp4'
//   }
// ]

const videoList = [
  {
    '_id': 'QmNPZWg2F946MjvLKFmyFkQ3kP1PbUazsKof1cmFUoTf98',
    'title': 'CESC2017 - Sinclair Davidson - What is a Token?',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmVf18CJ4kBJTXVZKMWVm54obnwVzMQs6JU9YxuTfDm5F2',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/sIp11sadEyU/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'QmNZS5J3LS1tMEVEP3tz3jyd2LXUEjkYJHyWSuwUvHDaRJ',
    'title': 'The mathematician who cracked Wall Street | Jim Simons',
    'description': "Jim Simons was a mathematician and cryptographer who realized: the complex math he used to break codes could help explain patterns in the world of finance. Billions later, he’s working to support the next generation of math teachers and scholars. TED’s Chris Anderson sits down with Simons to talk about his extraordinary life in numbers.\n\nTEDTalks is a daily video podcast of the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and much more.\nFind closed captions and translated subtitles in many languages at http://www.ted.com/translate\n\nFollow TED news on Twitter: http://www.twitter.com/tednews\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: http://www.youtube.com/user/TEDtalksD...",
    'price': 14,
    'src': '/ipfs/QmQvhvzMXKX71jLGjSfM9iKiWVKETXDmkPaQXhe4WrMmZ9',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/U5kIdtMJGc8/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'TED'
    },
    'tags': [
      'TEDTalk',
      'TEDTalks',
      'TED Talk',
      'TED Talks',
      'Jim Simons',
      'TED2015',
      'Human origins',
      'Investment',
      'Math',
      'Philanthropy',
      'Physics'
    ]
  },
  {
    '_id': 'QmNhyQjsFW2Tvuz7CFwDTBPo3dfBQ3S4StEpfUZPSpK9FY',
    'title': 'Devcon2: Ethereum in 25 Minutes',
    'description': 'Presentation Slides Download: https://ethereumfoundation.org/devcon...\n\nDevcon2: Ethereum in 25 Minutes. Ethereum Foundation Chief Scientist, Vitalik Buterin, describes Ethereum.\nSpeakers: Vitalik Buterin\n\nEthereum Developer Conference, 2016 September 19 - 21,\nShanghai, China',
    'price': 0,
    'src': '/ipfs/QmU1f8mKebPzCHskk3DDsFUJLxFLVeCxJ1BqyhQvkV8FyJ',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/66SaEDzlmP4/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Ethereum Foundation'
    },
    'tags': [
      'blockchain',
      'smart contracts',
      'distributed ledger',
      'Vitalik Buterin',
      'devcon2',
      'ethereum'
    ]
  },
  {
    '_id': 'QmP4wvUBhKyygjdf8XLkA6p79FsUCtc2TR3i1NzBoK2krr',
    'title': 'Doug Petkanics (Livepeer): Realtime video streaming on swarm (1/3)',
    'description': 'Doug Petkanics (Livepeer): Realtime video streaming on swarm\n\nPresentation at Swarm Summit 2017\nmore info at http://swarm-gateways.net',
    'price': 0,
    'src': '/ipfs/QmYWbuJZiDYA5RdUEBo9SXfVZWKbM4Y93Swu9ftezwkMjG',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/MB-drzcRCD8/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Aron Privacy'
    },
    'tags': [
      'swarm',
      'ethereum',
      'swarmsummit2017'
    ]
  },
  {
    '_id': 'QmPDG5AxEpfsQ1cfWU6Kcguc9Bn6eDEdKiUbqxUwSRQBi7',
    'title': 'Ethereum ÐΞVcon-0: Ethereum 1.x: On blockchain interop and scaling',
    'description': 'Vlad Zamfir and Vitalik Buterin present their latest research on blockchain interoperability and scaling as part of DEVCON 0.',
    'price': 0,
    'src': '/ipfs/QmPDG5AxEpfsQ1cfWU6Kcguc9Bn6eDEdKiUbqxUwSRQBi7',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/fwEsXBDFk6c/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Ethereum'
    },
    'tags': [
      'ethereum',
      'smart contracts',
      'blockchain',
      'scaling',
      'vitalik buterin',
      'vlad zamfir'
    ]
  },
  {
    '_id': 'QmPRWjy3xqbxukKBMVTYH6Zk44gkVJFwzexzvZYfM164Rv',
    'title': "We've stopped trusting institutions and started trusting strangers | Rachel Botsman",
    'description': "Something profound is changing our concept of trust, says Rachel Botsman. While we used to place our trust in institutions like governments and banks, today we increasingly rely on others, often strangers, on platforms like Airbnb and Uber and through technologies like the blockchain. This new era of trust could bring with it a more transparent, inclusive and accountable society — if we get it right. Who do you trust?\n\nTEDTalks is a daily video podcast of the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and much more.\nFind closed captions and translated subtitles in many languages at http://www.ted.com/translate\n\nFollow TED news on Twitter: http://www.twitter.com/tednews\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: http://www.youtube.com/user/TEDtalksD...",
    'price': 0,
    'src': '/ipfs/QmWVYEZKE1E4U8Xgh88Td5iqhFgnHq4giTM7JoaDu89WMw',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/GqGksNRYu8s/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'TED'
    },
    'tags': [
      'TED Talk',
      'TED Talks',
      'Rachel Botsman',
      'trust',
      'blockchain',
      'BlaBlaCar',
      'Airbnb',
      'Uber',
      'government',
      'banks',
      'sharing economy',
      'society'
    ]
  },
  {
    '_id': 'QmPjN157Bbjju8WhaktSwA5KSzGxpmT1HfBrE4xjw4VN9n',
    'title': 'Doug Petkanics (Livepeer): Realtime video streaming on swarm (2/3)',
    'description': 'Doug Petkanics (Livepeer): Realtime video streaming on swarm\n\nPresentation at Swarm Summit 2017\nmore info at http://swarm-gateways.net',
    'price': 0,
    'src': '/ipfs/QmTJ6eCzaK2rzVr4hcbyxu8ZjSdSLDoHUn7ddgndeTXCa7',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/pQjwySXLm6Y/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Aron Privacy'
    },
    'tags': [
      'swarm',
      'ethereum',
      'swarmsummit2017'
    ]
  },
  {
    '_id': 'QmPxeBDGspPx7ir6sT7bWrHqMjwXEmqPjPRKa7eAep3bwp',
    'title': 'Introducing the Render Token',
    'description': 'Co-founder and CEO Jules Urbach introduces the Render Token network and system.\nTo learn more visit rendertoken.com/\nStay updated @rendertoken on Twitter and Medium',
    'price': 0,
    'src': '/ipfs/Qma1wQ1H3hBD5imQiFv6SWW4idx6FV1F1BdnFjADCdwA7z',
    'mimetype': 'video/mp4',
    'thumb': 'thumbnail-1280x720_1.png',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Render Token'
    }
  },
  {
    '_id': 'QmQ1jsHFHr1ovP9MnNumorcBZPxheJtrrWczrNvCmRkjCH',
    'title': 'CESC2017 - Eleftherios Kokoris-Kogias - Scalable and Efficient Distributed Ledgers',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmevuGixcmVJg8FB2y6i1GvBSNWTaTNFpbxwgKnhUf2RAd',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/yZCe_ra2a8w/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'QmQNmx5C6YpbP5KtWiB3wHB8Cz2UpBA1RLa31emCs1Z54m',
    'title': 'CESC2017 - Rafael Pass - Thunderella',
    'description': 'Thunderella: a fast and scalable blockchain',
    'price': 0,
    'src': '/ipfs/QmXtoDgqzSr5ECwzQYYeqsDJoSmccj7xpJdDqsicBqm2Lo',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/DY2qhydRK_0/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'QmQUgoZTGjJYdMYbaRZgSYwuJhLfiej7TwxJnwbw5Akmo9',
    'title': 'CESC2017 - Shin’ichiro Matsuo - Global Scale Research Networks and Cryptoeconomics',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmaW2T8QESQvABYFTiFbFGjMXiBfVxcZiU3tpzNiStH18f',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/G9Bp56y3X8U/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'QmQmBaxNvXcYWfDvPRw9RPUq1RyMmV1N8y5fdgbxaArt4V',
    'title': 'CESC2017 - Karl Floersch - Casper Proof of Stake',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmQZbQJ5nRkAafVg3yhE8Jmftwgh69cBx2Kyjaht5jgU1a',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/ycF0WFHY5kc/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'QmQoLWBBLzygZh1ucj1EzyzMqySzGWmMGSpfAyZcqZr5Dn',
    'title': 'CESC2017 - Sinclair Davidson - What is a Token?',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmaHJqPEHxRh6wkgiXsFL4Xt9ZhLVJ6JD4sbD6MRi5zveB',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/sIp11sadEyU/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'QmRDpg7zQxVZqC1sjq3Lyb1SYZMekBpcmdJWc1HKDWQ7xM',
    'title': 'Vitalik Buterin reveals Ethereum at Bitcoin Miami 2014',
    'description': 'Vitalik Buterin, Founder and Inventor, introduces Ethereum at the Bitcoin Miami conference 2014. Vitalik received a standing ovation for the project which stands to change how the world relates to currency and financial instruments.',
    'price': 0,
    'src': '/ipfs/QmRDpg7zQxVZqC1sjq3Lyb1SYZMekBpcmdJWc1HKDWQ7xM',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/l9dpjN3Mwps/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Ethereum'
    },
    'tags': [
      'ethereum',
      'vitalik',
      'buterin',
      'bitcoin',
      'miami',
      '2014',
      'conference',
      'smart contracts',
      'dacs',
      'dac',
      'dao'
    ]
  },
  {
    '_id': 'QmRfgwZWphXHhFU2h3pTozoYkZCB58KPo7zqsqsYKLdezG',
    'title': 'Thelonious Monk - Underground (HD FULL ALBUM)',
    'description': "Thelonious Sphere Monk (October 10, 1917 – February 17, 1982) was an American jazz pianist and composer. Monk had a unique improvisational style and made numerous contributions to the standard jazz repertoire, including \"'Round Midnight\", \"Blue Monk\", \"Straight, No Chaser\" \"Ruby, My Dear\", \"In Walked Bud\", and \"Well, You Needn't\".\n\nAlthough this album is most widely known for its provocative cover image, which depicts Monk as a fictitious French Resistance fighter in the Second World War, it contains a number of new Monk compositions, some of which appear in recorded form only on this album. This is the last Monk album featuring the Thelonious Monk Quartet, and the last featuring Charlie Rouse (who appears on only half the tracks, having missed a recording session to attend his father's funeral).\n(Taken from Wikipedia)\n\nTracklist:\n\n01 - 00:00 - Thelonious\n02 - 03:17 - Ugly Beauty\n03 - 14:04 - Raise Four\n04 - 21:06 - Boo Boo’s Birthday (Take 11)\n05 - 27:04 - Easy Street\n06 - 34:57 - Green Chimneys\n07 - 48:09 - In Walked Bud\n08 - 54:59 - Ugly Beauty (Take 4)\n09 - 62:38 - Boo Boo’s Birthday (Take 2)\n10 - 68:14 - Thelonious (Take 3)\n\nThelonious Monk - Piano\nCharlie Rouse - Tenor Sax\nLary Gales - Bass\nBen Riley - Drums\n\nJon Hendricks - vocals on \"In Walked Bud\"\n\nProducer: Teo Macero\n\nLearn more about Thelonious Monk:\nhttp://monkinstitute.org/about-us/the...",
    'price': 0,
    'src': '/ipfs/QmcG7zfXxsjrCrRby6SBG2wLabzix61WZkFwJAQQJmQvuV',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/eXKIEJ0ez98/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Through Time & Space'
    },
    'tags': [
      'Jazz',
      'Bebop',
      'Bepop',
      'Jazz music',
      'Smooth jazz',
      'Thelonious Monk',
      'Ella Fitzgerald',
      'Good Jazz',
      'Full album',
      'HD',
      'HQ',
      'High quality',
      'Round Midnight',
      'Thelonious',
      'Ugly Beauty',
      'Raise Four',
      "Boo Boo's Birthday",
      'Easy Street',
      'Green Chimneys',
      'In Walked Bud',
      'post-bebop',
      'jazz fusion',
      'cool jazz',
      'smooth jazz'
    ]
  },
  {
    '_id': 'QmRxm6MCev21Zpk1rp8GcaxUbgsM48gbmaVrsNsyd8yoLN',
    'title': 'Preview Trailer - Around the Block',
    'description': 'This is a preview.',
    'price': 0,
    'src': '/ipfs/QmPMU2eiLf5sqXw37EwKd5U6d65GqyD7FoaihHXBA5avxE',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/LR1fOVVxqZU/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Paratii.video'
    },
    'tags': ''
  },
  {
    '_id': 'QmS96FrGgPAci3aH5untaKuTgz7yde2XPX9mhywKGvBA3p',
    'title': 'Doug Petkanics / Viktor Tron: Realtime video streaming on swarm (3/3)',
    'description': 'Doug Petkanics and Viktor Tron: Realtime video streaming on swarm\n\nPresentation at Swarm Summit 2017\nmore info at http://swarm-gateways.net',
    'price': 0,
    'src': '/ipfs/QmdALMEdZ9KbiFBDqPq61SAy3wotbB3Fy57ods1a9gg191',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/wpXBENzAmfg/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Aron Privacy'
    },
    'tags': [
      'swarm',
      'ethereum',
      'swarmsummit2017'
    ]
  },
  {
    '_id': 'QmSJPDbaUsFR236vaVKYyqFPoVShBv2RrYgJ1yeqStj4uB',
    'title': 'Doug Petkanics (Livepeer): Realtime video streaming on swarm (2/3)',
    'description': 'Doug Petkanics (Livepeer): Realtime video streaming on swarm\n\nPresentation at Swarm Summit 2017\nmore info at http://swarm-gateways.net',
    'price': 0,
    'src': '/ipfs/QmSJPDbaUsFR236vaVKYyqFPoVShBv2RrYgJ1yeqStj4uB',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/pQjwySXLm6Y/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Aron Privacy'
    },
    'tags': [
      'swarm',
      'ethereum',
      'swarmsummit2017'
    ]
  },
  {
    '_id': 'QmSTWrx4g1dQwhNJhaiDwzk6D3693VY3uaMkDDgZqYHKXC',
    'title': 'CESC2017 - Ryan Zurrer - Keepers',
    'description': '',
    'price': 0,
    'src': '/ipfs/Qmeds3RhqZfVPGy4DD6kL1W4xVXXfcikqR9jxpTMLKjGAZ',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/2u60czobhBo/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'QmTMP3QjDLxGdLHxE9mzwm3rytvY9y4Z1ZCTwKNtFsGCva',
    'title': 'CESC2017 - Neil Gandal - Price Manipulation in the Bitcoin Ecosystem',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmPMnPN53mRGXvm2y3t3Ba8aypuW53aMYbfienZVZNRbWX',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/k7rgse0gISI/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'QmTUymnMrHiZdMvvJfjx8m8YjrzHXEZCwV23BNqGXDHqcy',
    'title': 'CESC2017 - Balaji Srinivasan - Quantifying Decentralization',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmRPaoXoARwgt4c83wWRuZoaSL3Vn4X2MtbVEzzjpcyaxW',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/2GwN3vc_9ic/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'QmTu5dEdUk37hAcXBBa9Y8zRfd5rnY4gSCTahbYYkJPZsU',
    'title': 'DEVCON1: Ethereum for Dummies - Dr. Gavin Wood',
    'description': "DEVCON1 10:45am Day 5\n\nEthereum's CTO Dr. Gavin Wood presents \"Ethereum for Dummies\" or \"So, now we've built it, WTF is it?\"",
    'price': 0,
    'src': '/ipfs/Qmf52shAzKuuNSiZDyYoMeitzrb54yzwczxNoyuKEdpVHz',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/U_LK0t_qaPo/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Ethereum'
    },
    'tags': [
      'ethereum',
      'smart contracts',
      'Dr. Gavin Wood',
      'Gav',
      'Wood',
      'Gavin Wood',
      'Gav Wood',
      'Whisper',
      'Solidity',
      'Swarm',
      'Microsoft',
      'research',
      'PhD',
      'Future',
      'Blockchain',
      'DApp',
      'World Computer',
      'Contracts',
      'dummies',
      'for'
    ]
  },
  {
    '_id': 'QmUo377i6myRDXjZNxhcdjbvtKkN4QqFjLC5WXQZdguT9s',
    'title': 'DEVCON1: History of the Blockchain - Nick Szabo',
    'description': 'DEVCON1 - Day 5 - 13th November 2015\n\nNick Szabo (http://szabo.best.vwh.net/) takes the stage to present on the history of blockchain technology and his work on the Ethereum tech stack.',
    'price': 0,
    'src': '/ipfs/QmYSAM1QnHtc6NH13MnYgeenUbLwBLQF6c3owjeAfurQMN',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/7Y3fWXA6d5k/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Ethereum'
    },
    'tags': [
      'ethereum',
      'smart contracts',
      'Nick Szabo',
      'Block Chain'
    ]
  },
  {
    '_id': 'QmVKgd4AzrnjKFiuuXEKvfuDz1uoYGeagddrdNTmYvN2wX',
    'title': 'Keith Chen: Could your language affect your ability to save money?',
    'description': "What can economists learn from linguists? Behavioral economist Keith Chen introduces a fascinating pattern from his research: that languages without a concept for the future -- \"It rain tomorrow,\" instead of \"It will rain tomorrow\" -- correlate strongly with high savings rates.\n\nTEDTalks is a daily video podcast of the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and much more.\nFind closed captions and translated subtitles in many languages at http://www.ted.com/translate\n\nFollow TED news on Twitter: http://www.twitter.com/tednews\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: http://www.youtube.com/user/TEDtalksD...",
    'price': 0,
    'src': '/ipfs/Qmeb223WSUVerCuF1bEqqv848ZCC6ECmZus4jzVMsXrhpE',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/lw3YTbubyjI/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'TED'
    },
    'tags': [
      'TEDTalk',
      'TEDTalks',
      'TED Talk',
      'TED Talks',
      'TED',
      'TEDGlobal',
      '\\Keith Chen\\',
      '\\behavioral economics\\',
      'business',
      'data',
      'economics',
      'language'
    ]
  },
  {
    '_id': 'QmVWuCmUcUNs87AW2ZU7X2M4KtH66WhdZ7zkbTbCT4XkBV',
    'title': 'Fear and Desire',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmTigQbUpPrTiQ97koyNZGYfx5FRMf3viz2rxkz4kTcx9K',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/JbokkV1Roj4/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'cinevault'
    },
    'tags': [
      'Fear',
      'and',
      'Desire'
    ]
  },
  {
    '_id': 'QmVc9KLKyViB5DZoYqx7fw3DUSsWwdGbeExcu3EShYtRp5',
    'title': 'CESC2017 - Dmitry Meshkov - On Space-Scare Economy',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmTQAKHPifrS5m6CSLcBs1kroCRPSsCaJsdN9XHFctqj4N',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/gBy-pu1kzdQ/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'QmVfLF8tNK9jhxyTeqMNhj1TbUMDXRMTEhC2iZdcft6fWY',
    'title': 'Santiment: A Better Way to Trade Crypto Markets',
    'description': 'This is "Santiment: A Better Way to Trade Crypto Markets" by Santiment on Vimeo, the home for high quality videos and the people who love them.',
    'price': 0,
    'src': '/ipfs/QmT8gz3ZCde4LKjypmHsKLRTGh1AFzQxp31qKE2VgNcC3Y',
    'mimetype': 'video/mp4',
    'thumb': 'thumbnail-1280x720_1.png',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Santiment'
    }
  },
  {
    '_id': 'QmVmf5BgvH2Qvq9R4b4P7r9kx4ZNMQ24E41iAwAXkvoLZn',
    'title': 'Building The Meta Model on Numerai',
    'description': 'Read more on our Medium post: https://medium.com/@Numerai/invisible...\nNumerai is synthesizing machine intelligence to command the capital of an American hedge fund. In this short film, we explain how, with interviews from Howard Morgan (co-founder of Renaissance Technologies), Norman Packard (co-founder of Prediction Company), Peter Diamandis (founder of XPRIZE, Singularity University), Olaf Carlson-Wee (founder of Polychain Capital, formerly Coinbase), Geoff Bradway (Permutation Ventures, formerly Google DeepMind), Yunus Saatchi (Permutation Ventures, formerly Vicarious) and Joey Krug (founder of Augur, Thiel Fellow)',
    'price': 0,
    'src': '/ipfs/QmVmf5BgvH2Qvq9R4b4P7r9kx4ZNMQ24E41iAwAXkvoLZn',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/dhJnt0N497c/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Numerai'
    },
    'tags': [
      'artificial intelligence',
      'ai',
      'numerai',
      'coinbase',
      'polychain',
      'thiel',
      'singularity',
      'thiel fellow',
      'hedge fund',
      'machine learning',
      'prediction',
      'equity',
      'robot',
      'vicarious',
      'permutation ventures',
      'bitcoin'
    ]
  },
  {
    '_id': 'QmVyvdBHB17n3Z2AkBMRexS6CQkyeLKYWeX8LsDfT3zPej',
    'title': 'CESC2017 - Vlad Zamfir - Cryptoeconomics in Casper',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmNo1yJnFP3E5pTQFu5bnSkZtxs4G4sSDYLVLxefbVZxq1',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/5ScY7ruD_eg/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'QmW9fin8DKeCyjY6PZAZ3qShGvbMr8xFk4aFcppMdktgT9',
    'title': 'CESC2017 - Ren Zhang - Analyzing the Bitcoin Unlimited Mining Protocol',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmXQvcG42ZWK4r7rkfL3JNCmWas4haWbhkD6tAmRRw376o',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/P35M74KcLmA/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'QmWrxFFHQB1rYDb4hYWNTsQgKicqAgrs37hT8Sfu4rUphY',
    'title': 'Introducing Numeraire',
    'description': 'Today, we issued our twelve thousand data scientists one million crypto-tokens to incentivize the construction of an artificial intelligence hedge fund. Here’s why.\nFeaturing interviews with Numerai investors Andy Weissman and Fred Wilson of Union Square Ventures; Joey Krug of Augur and Juan Benet of IPFS and Filecoin.\nRead more here:\nmedium.com/numerai/a-new-cryptocurrency-for-coordinating-artificial-intelligence-on-numerai-9251a131419a#.kjtbu2k6c',
    'price': 0,
    'src': '/ipfs/Qme3GH9CWn8iTzaUG5Lo6ZYRSuFF7tASaWNsRwTwcymHpQ',
    'mimetype': 'video/mp4',
    'thumb': 'thumbnail-1280x720_1.png',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Numerai'
    }
  },
  {
    '_id': 'QmX6LC9u4R4Q4aQtEnZKhFbzEesNtXFFjZSZg8rzdzrG36',
    'title': 'How the blockchain is changing money and business | Don Tapscott',
    'description': "What is the blockchain? If you don't know, you should; if you do, chances are you still need some clarification on how it actually works. Don Tapscott is here to help, demystifying this world-changing, trust-building technology which, he says, represents nothing less than the second generation of the internet and holds the potential to transform money, business, government and society.\n\nTEDTalks is a daily video podcast of the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and much more.\nFind closed captions and translated subtitles in many languages at http://www.ted.com/translate\n\nFollow TED news on Twitter: http://www.twitter.com/tednews\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: http://www.youtube.com/user/TEDtalksD...",
    'price': 0,
    'src': '/ipfs/QmP7UrJauwsnsguuQsjpXw6SzSWTU8KaSnjzfF57SDz5Nj',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/Pl8OlkkwRpc/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'TED'
    },
    'tags': [
      'TED Talk',
      'TED Talks',
      'blockchain',
      'Bitcoin',
      'currency',
      'economy',
      'trust',
      'Don Tapscott',
      'Alex Tapscott',
      'money',
      'business',
      'government',
      'society'
    ]
  },
  {
    '_id': 'QmY2iJsCzedduKPAtib6nCKWd8fqYqTMnwFegh544Q7tW7',
    'title': 'CESC2017 - Ratul Saha - Power Splitting Games in Distributed Computation',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmX4qHN35WBwLhXWZgkQERPYWgtQev4ZrpJNvUv7tjYyBr',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/Ymg_sq9j_To/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'QmYD2CSJ6gkeUaSwwUq1EM1eRFtjvkhpSFToiyQrvp8DHW',
    'title': 'CESC2017 - Ren Zhang - Analyzing the Bitcoin Unlimited Mining Protocol',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmcsGURc4MtPXYa5X1nAw6bppWHopBHRjZ7SeHPQeWTmUQ',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/P35M74KcLmA/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'QmYWbuJZiDYA5RdUEBo9SXfVZWKbM4Y93Swu9ftezwkMjG',
    'title': 'Doug Petkanics (Livepeer): Realtime video streaming on swarm (1/3)',
    'description': 'Doug Petkanics (Livepeer): Realtime video streaming on swarm\n\nPresentation at Swarm Summit 2017\nmore info at http://swarm-gateways.net',
    'price': 0,
    'src': '/ipfs/QmYWbuJZiDYA5RdUEBo9SXfVZWKbM4Y93Swu9ftezwkMjG',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/MB-drzcRCD8/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Aron Privacy'
    },
    'tags': [
      'swarm',
      'ethereum',
      'swarmsummit2017'
    ]
  },
  {
    '_id': 'QmZ324xmvYEa7cHqk32jz51jiMHzRRLHkHxMur3hKy8GaX',
    'title': 'How the blockchain will radically transform the economy | Bettina Warburg',
    'description': "Say hello to the decentralized economy -- the blockchain is about to change everything. In this lucid explainer of the complex (and confusing) technology, Bettina Warburg describes how the blockchain will eliminate the need for centralized institutions like banks or governments to facilitate trade, evolving age-old models of commerce and finance into something far more interesting: a distributed, transparent, autonomous system for exchanging value.\n\nTEDTalks is a daily video podcast of the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and much more.\nFind closed captions and translated subtitles in many languages at http://www.ted.com/translate\n\nFollow TED news on Twitter: http://www.twitter.com/tednews\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: http://www.youtube.com/user/TEDtalksD...",
    'price': 0,
    'src': '/ipfs/QmSveLgoX6kVU2mjVcX14mnJFvwfLMdN2onSdTpKNz5K4V',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/RplnSVTzvnU/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'TED'
    },
    'tags': [
      'TED Talk',
      'TED Talks',
      'blockchain',
      'Bettina Warburg',
      'technology',
      'trade',
      'commerce',
      'finance',
      'automation',
      'decentralized economy',
      'economy',
      'money',
      'business',
      'future of money'
    ]
  },
  {
    '_id': 'QmZ7Bh6YwiCTMGCMYcMM2WsYS2Se3Tu4GkctuhabemRCc6',
    'title': 'Daniel Nagy (EF, Swarm team): Plausible Deniability (1/2)',
    'description': 'Daniel Nagy (EF, Swarm team): Plausible Deniability at Swarm Summit 2017\nmore info at http://swarm-gateways.net',
    'price': 0,
    'src': '/ipfs/QmZEPqtxBNXfqtYNih35AAeiYLP4fyrYfdFtk9xQFzZepa',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/fOJgNPdwy18/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Aron Privacy'
    },
    'tags': [
      'swarm',
      'ethereum',
      'swarmsummit2017'
    ]
  },
  {
    '_id': 'QmZttMGbpJAkK9Nt8tVyoAxXJKcNLPmWPhhZhe52WoR2LV',
    'title': 'Vitalik Buterin reveals Ethereum at Bitcoin Miami 2014',
    'description': 'Vitalik Buterin, Founder and Inventor, introduces Ethereum at the Bitcoin Miami conference 2014. Vitalik received a standing ovation for the project which stands to change how the world relates to currency and financial instruments.',
    'price': 0,
    'src': '/ipfs/QmRDpg7zQxVZqC1sjq3Lyb1SYZMekBpcmdJWc1HKDWQ7xM',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/l9dpjN3Mwps/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Ethereum'
    },
    'tags': [
      'ethereum',
      'vitalik',
      'buterin',
      'bitcoin',
      'miami',
      '2014',
      'conference',
      'smart contracts',
      'dacs',
      'dac',
      'dao'
    ]
  },
  {
    '_id': 'QmaYXEYgqVVKJcUCpXHoiX6zTqXbbQAS4JMK5BDE9BeCXn',
    'title': 'RIP : A Remix Manifesto',
    'description': 'Immerse yourself in the energetic, innovative and potentially illegal world of mash-up media with RiP: A Remix Manifesto. Let web activist Brett Gaylor and musician Greg Gillis, better known as Girl Talk, serve as your digital tour guides on a probing investigation into how culture builds upon culture in the information age.\nBiomedical engineer turned live-performance sensation Girl Talk, has received immense commercial and critical success for his mind-blowing sample-based music. Utilizing technical expertise and a ferocious creative streak, Girl Talk repositions popular music to create a wild and edgy dialogue between artists from all genres and eras. But are his practices legal? Do his methods of frenetic appropriation embrace collaboration in its purest sense? Or are they infractions of creative integrity and violations of copyright?\nThis documentary is released under Creative Commons Attribution — Noncommercial 3.0 Unported license.',
    'price': 0,
    'src': '/ipfs/Qmcw1YXdtmik4KsELVjVW25T5F9EZRVYefATXhbWDYK19t',
    'mimetype': 'video/mp4',
    'thumb': 'thumbnail-640x360_1.png',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Laurent LaSalle'
    }
  },
  {
    '_id': 'Qmaa7MurPx8Sn4d5vN1pG2Ba6aLFyyKSqF55Tnk5n1KzUH',
    'title': 'Preview Trailer - Around the Block',
    'description': 'This is a preview.',
    'price': 0,
    'src': '/ipfs/Qmaa7MurPx8Sn4d5vN1pG2Ba6aLFyyKSqF55Tnk5n1KzUH',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/LR1fOVVxqZU/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Paratii.video'
    },
    'tags': ''
  },
  {
    '_id': 'QmagzVuCFuvBiw6Wv3Fog4U6SgqbiJCnbkv7ZeviG8LYqt',
    'title': 'SONM Chief Designer telling the story of SONM logo',
    'description': 'Oxana Lorie, SONM Chief Designer, spoke about the SONM logo in the interview below. Learn more about the initial design ideas and watch the story of the SONM circles creation.\n\nOur website: https://sonm.io',
    'price': 0,
    'src': '/ipfs/QmfRKofRfoqiUbvNvcEMbWrALBTHGQKti93i1xFCnyBeUu',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/CKa5gTPg6aY/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'SONM'
    },
    'tags': [
      'Blockchain',
      'Bitcoin',
      'Cryptucurrency',
      'Ethereum',
      'ICO',
      'BTC',
      'ETH',
      'Designer'
    ]
  },
  {
    '_id': 'QmbPX1XtKe2AwkeVWZJnrNkdv9ogn4oiQ85c2HjaLtAKiF',
    'title': 'CESC2017 - Jordan Earls - Economics of Fees and Gas',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmZUbZ7HKWwgRyXw6ERt443knQYjoQzJ6KoYuetN6xgLji',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/8Y_RgEIJisA/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'Qmbytj8B3A5MD8QX69oGaXEAp4ZUdF7A2BT2tC5fb1G6TF',
    'title': 'Viktor Tron - Distributed Database Services - Swarm Orange Summit 2017',
    'description': 'Viktor Tron at Swarm Summit 2017\n\nmore info at http://swarm-gateways.net',
    'price': 0,
    'src': '/ipfs/QmY1NVqNmXjpaNAcnYhjfQk89NYBU5P1p7gD9ZjRFQA3n6',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/H9MclB0J6-A/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Aron Privacy'
    },
    'tags': [
      'swarm',
      'ethereum',
      'swarmsummit2017'
    ]
  },
  {
    '_id': 'Qmc1LNpEeoEVavQdYXewRyUQGcH974jWpnMLZ4mRGXzpNC',
    'title': 'Ethereum',
    'description': 'Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, fraud or third party interference.',
    'price': 0,
    'src': '/ipfs/QmejwMM42y5xYuV3sACxztQsK6YqMxTnMAq4FEWokxqwZ6',
    'mimetype': 'video/mp4',
    'thumb': 'thumbnail-1280x720_1.png',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Nucco Brain'
    }
  },
  {
    '_id': 'Qmc5PEWf3Ns31rwXirjjcAMFBn1paQ9T9YtzxWeRCqnDDD',
    'title': 'Ethereum ÐΞVcon-0: Ethereum 1.x: On blockchain interop and scaling',
    'description': 'Vlad Zamfir and Vitalik Buterin present their latest research on blockchain interoperability and scaling as part of DEVCON 0.',
    'price': 0,
    'src': '/ipfs/QmaWGPxjeW8s747ho9dBvZ1Fa7pDR6JrRNBKSFVhQkWTL3',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/fwEsXBDFk6c/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Ethereum'
    },
    'tags': [
      'ethereum',
      'smart contracts',
      'blockchain',
      'scaling',
      'vitalik buterin',
      'vlad zamfir'
    ]
  },
  {
    '_id': 'QmcLrjZcHqiB4rv3Tf6CoBEUNEPGQsRCK18gJQS2Xs6am1',
    'title': "Poverty isn't a lack of character; it's a lack of cash | Rutger Bregman",
    'description': "\"Ideas can and do change the world,\" says historian Rutger Bregman, sharing his case for a provocative one: guaranteed basic income. Learn more about the idea's 500-year history and a forgotten modern experiment where it actually worked -- and imagine how much energy and talent we would unleash if we got rid of poverty once and for all.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more.\n\nFollow TED on Twitter: http://www.twitter.com/TEDTalks\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: https://www.youtube.com/TED",
    'price': 0,
    'src': '/ipfs/QmWFmxUcShFirqXnkhXJGwrJNPopK42RKYtbBT6fy5TGEK',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/ydKcaIE6O1k/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'TED'
    },
    'tags': [
      'TEDTalk',
      'TEDTalks',
      'Capitalism',
      'Economics',
      'Inequality',
      'Money',
      'Policy',
      'Resources',
      'Social change',
      'Society',
      'Work',
      'Rutger Bregman',
      'guaranteed basic income',
      'poverty'
    ]
  },
  {
    '_id': 'QmciKoXJ7u9vTCa5TniiUxzNTPWD5fHvTUUDQivd3YBbdb',
    'title': 'Devcon2: Regulatory Considerations for Dapp Development',
    'description': "Presentation Slides Download: https://ethereumfoundation.org/devcon...\n\nDevcon2: Regulatory Considerations for Dapp Development.\n\nDapp development and token distribution particularly, pose unique questions for regulators and law enforcement. Ethereum Foundation Executive Director, Ming Chan, will introduce the topic of regulatory issues when creating Dapps, followed by Peter Van Valkenburgh introducing Coin Center. Peter will give a brief summary of Coin Center's advocacy work and the current legal landscape surrounding these technologies.\n\nSpeakers: Ming Chan and Peter Van Valkenburgh\n\nEthereum Developer Conference, 2016 September 19 - 21,\nShanghai, China",
    'price': 0,
    'src': '/ipfs/QmWBCVR7N4QtnMYtKC34tGjJXbJgnDSEDZVLA6wDxmK7BP',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/5J8BL60_zj8/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Ethereum Foundation'
    },
    'tags': [
      'blockchain',
      'smart contracts',
      'distributed ledger',
      'Peter Van Valkenburgh',
      'coincenter',
      'coin center',
      'token sale',
      'ethereum',
      'devcon2'
    ]
  },
  {
    '_id': 'QmcrACDHcUQ2M3HxT65WawRik4mpCFQDhvpHr5QeyoM9Qw',
    'title': 'The Mauve Revolution',
    'description': 'Presentation Slides Download: https://ethereumfoundation.org/devcon...\n\nDevcon2: The Mauve Revolution\nSpeaker: Vitalik Buterin\n\nProof of stake and sharding present two of the biggest upcoming milestones in the ongoing development of the Ethereum protocol. Proof of stake offers the promise to greatly reduce the cost of consensus and increase security guarantees, while sharding presents an approach to allow on-chain scaling to tens of thousands of transactions per second while still retaining a network that can, if needed, run on nothing but a sufficiently large set of consumer laptops. The Casper approach to proof of stake also introduces a number of novel concepts, including consensus-by-bet and fork choice by value-at-loss.\n\nEthereum Developer Conference, 2016 September 19 - 21,\nShanghai, China',
    'price': 0,
    'src': '/ipfs/Qmb1va4tA3vpv2K4RfjYqT1a184E2Ka2dfUh2ZJF6xMN7L',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/bSdwqa3Yl0Q/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Ethereum Foundation'
    },
    'tags': [
      'blockchain',
      'smart contracts',
      'distributed ledger',
      'Mauve Revolution',
      'ethereum',
      'devcon2',
      'vitalik buterin',
      'casper',
      'pos',
      'sharding'
    ]
  },
  {
    '_id': 'Qmcy6hsqQrMTnZPn1W3hMv2LfcPcptmJpSmxq6frhP9A4U',
    'title': 'SONM The Discovery Algorithm: How it Works',
    'description': 'SONM is proud to announce that the Discovery Algorithm is functional within the SONM network. The Discovery Algorithm will connect all network nodes automatically to ensure that the process runs easily and quickly — same if the miner tries to navigate with GPS instead a paper map on a road. Please watch the video below for more information.\n\nWebsite & blog:\nhttps://sonm.io\nhttps://blog.sonm.io\n\nCommunities:\nTelegram - https://t.me/sonm_eng\nSlack - https://goo.gl/oe3ZbN',
    'price': 0,
    'src': '/ipfs/QmTtWttorVKfpwttiWk4ri8DZseKEPrZzT7JVLaCZCNPoP',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/2MfOQcHooNo/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'SONM'
    },
    'tags': [
      'Blockchain',
      'SONM',
      'Technology',
      'Bitcoin',
      'Ethereum',
      'Network',
      'Decentralization',
      'Decentralized',
      'Algorithm',
      'Mining'
    ]
  },
  {
    '_id': 'Qmd3z2r86HCvA1PThaKbn6b9K9HkxCLmJnVR9DSAkWgsC9',
    'title': 'A Deep Dive into the Colony Foundation Protocol - Dr. Aron Fischer and Elena Dimitrova',
    'description': 'The Colony Foundation is a non-profit foundation responsible for developing the open source Colony smart contract network on Ethereum. We see the Colony Network as infrastructure for internet organisations and part of the remit of the foundation will be supporting the development of applications on top of the protocol. This talk will give an in-depth look in to how it works.',
    'price': 0,
    'src': '/ipfs/QmZwP1YRqy3QdGpMTWobXpkkGJ7VguLtXmJnfFCLd9gWL2',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/zSF5fGPG4Ro/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Ethereum Foundation'
    },
    'tags': [
      'blockchain',
      'smart contracts',
      'distributed ledger'
    ]
  },
  {
    '_id': 'QmdALMEdZ9KbiFBDqPq61SAy3wotbB3Fy57ods1a9gg191',
    'title': 'Doug Petkanics / Viktor Tron: Realtime video streaming on swarm (3/3)',
    'description': 'Doug Petkanics and Viktor Tron: Realtime video streaming on swarm\n\nPresentation at Swarm Summit 2017\nmore info at http://swarm-gateways.net',
    'price': 0,
    'src': '/ipfs/QmdALMEdZ9KbiFBDqPq61SAy3wotbB3Fy57ods1a9gg191',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/wpXBENzAmfg/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Aron Privacy'
    },
    'tags': [
      'swarm',
      'ethereum',
      'swarmsummit2017'
    ]
  },
  {
    '_id': 'Qmdq7Ez55dmsqHT8JthBGV547R92CcPWgKU5edAGTRf8m6',
    'title': 'Building The Meta Model on Numerai',
    'description': 'Read more on our Medium post: https://medium.com/@Numerai/invisible...\nNumerai is synthesizing machine intelligence to command the capital of an American hedge fund. In this short film, we explain how, with interviews from Howard Morgan (co-founder of Renaissance Technologies), Norman Packard (co-founder of Prediction Company), Peter Diamandis (founder of XPRIZE, Singularity University), Olaf Carlson-Wee (founder of Polychain Capital, formerly Coinbase), Geoff Bradway (Permutation Ventures, formerly Google DeepMind), Yunus Saatchi (Permutation Ventures, formerly Vicarious) and Joey Krug (founder of Augur, Thiel Fellow)',
    'price': 0,
    'src': '/ipfs/QmVmf5BgvH2Qvq9R4b4P7r9kx4ZNMQ24E41iAwAXkvoLZn',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/dhJnt0N497c/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Numerai'
    },
    'tags': [
      'artificial intelligence',
      'ai',
      'numerai',
      'coinbase',
      'polychain',
      'thiel',
      'singularity',
      'thiel fellow',
      'hedge fund',
      'machine learning',
      'prediction',
      'equity',
      'robot',
      'vicarious',
      'permutation ventures',
      'bitcoin'
    ]
  },
  {
    '_id': 'Qme2fnAMS4daJB1V43rppqrQ41a3CkjMsHYKAhbhnXehdF',
    'title': 'CESC2017 - Silvio Micali - ALGORAND',
    'description': '',
    'price': 0,
    'src': '/ipfs/QmRhf69i7kRifoLh7J8iypzbsPtQjDEweMf4mwL2Yia8y3',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/NbnZi9SImYY/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Blockchain at Berkeley'
    },
    'tags': ''
  },
  {
    '_id': 'Qme2wSA7HgNYpdYRKFUpGHD2W7taZqG4gusrKNGs73NkGZ',
    'title': 'Integrating Ethereum Into Our Daily Lives - Jarrad Hope',
    'description': 'Status is a hybrid DApp Browser / Instant Messenger client built with Whisper and Ethereum. We had been mentioned in DEVCON1 as being a recipient of a DEVGrant for our EthereumJ work and we have since moved beyond that and are very excited to show off what we have been working on.',
    'price': 0,
    'src': '/ipfs/QmPtuzp74oi9rmThkApSm8UMbRBEbJ8KeGCa2x1FXhHc5U',
    'mimetype': 'video/mp4',
    'thumb': 'https://i.ytimg.com/vi/ZXZOdLuIAiE/default.jpg',
    'stats': {
      'likes': 0,
      'dislikes': 0
    },
    'uploader': {
      'address': '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
      'name': 'Ethereum Foundation'
    },
    'tags': [
      'blockchain',
      'smart contracts',
      'distributed ledger'
    ]
  }
]

async function deployContractsAndInstallFixtures () {
  console.log('Test environment: deploying contracts on startup')
  try {
    let contracts = await deployParatiiContracts()
    await contracts.ParatiiRegistry.registerNumber('VideoRedistributionPoolShare', web3.toWei(0.3), {from: web3.eth.accounts[0]})
    await contracts.ParatiiAvatar.addToWhitelist(contracts.VideoStore.address, {from: web3.eth.accounts[0]})

    for (let i = 0; i < videoList.length; i++) {
      let video = videoList[i]
      await contracts.VideoRegistry.registerVideo(String(video._id), video.uploader.address, Number(web3.toWei(video.price)), {from: web3.eth.accounts[0]})
      console.log(`registered video ${video._id} with price ${web3.toWei(video.price)} and owner ${video.uploader.address}`)
    }
    console.log('done installing contracts!')
    return contracts
  } catch (error) {
    // log the errors, otherwise they will just be ignored by useful meteor
    console.log(error)
    throw error
  }
}

if (Meteor.settings.public.isTestEnv) {
  // if we are in a test environment, we will deploy the contracts before starting to watch
  // we can do all this easily, because accounts[0] is unlocked in testrpc, and has lots of Ether.
  deployContractsAndInstallFixtures().then(function (contracts) {
    setRegistryAddress(contracts.ParatiiRegistry.address)
    Meteor.startup(
      function () {
        watchEvents()
      }
    )
  })

  // Videos
  const populateVideos = () => {
    Videos.remove({})
    console.log('|'); console.log('|')
    console.log('--> populate video collection')
    _.each(videoList, (video) => {
      Videos.insert(video)
    })
  }

  // Playlists
  const populatePlaylist = () => {
    // const p1 = {
    //   _id: '1',
    //   title: 'Around the block WebTorrent',
    //   description: 'A super playlist about blockchain!',
    //   url: 'around-the-block',
    //   videos: [Videos.find().fetch()[3]._id, Videos.find().fetch()[4]._id]
    // }
    // const p2 = {
    //   _id: '2',
    //   title: 'Around the block IPFS',
    //   description: 'A super playlist about blockchain!',
    //   url: 'around-the-block',
    //   videos: [Videos.find().fetch()[6]._id, Videos.find().fetch()[5]._id, Videos.find().fetch()[7]._id]
    // }
    // const p3 = {
    //   _id: '3',
    //   title: 'Best surf Collection',
    //   description: 'A collection of surfing’s most inspiring moments of the year, from dogs inside barrels to chasing the big ones in Northern California.',
    //   url: 'best-surf-colection',
    //   videos: [Videos.find().fetch()[0]._id, Videos.find().fetch()[1]._id]
    // }
    // const p4 = {
    //   _id: '4',
    //   title: 'Mother Life',
    //   description: 'A awesome playlist about Nature!',
    //   url: 'mother-life',
    //   videos: [Videos.find().fetch()[2]._id, Videos.find().fetch()[7]._id, Videos.find().fetch()[8]._id]
    // }

    // if (Playlists.find().count() === 0) {
    Playlists.remove({})
    console.log('--> populate playlists collection')

    // let playlistList = [p1, p2, p3, p4]
    let playlistList = [

      // Playlist: Into to the blockchain
      {
        _id: '1',
        title: 'Intro to the blockchain',
        description: '',
        url: 'intro-to-the-blockchain',
        videos: [
          'QmNZS5J3LS1tMEVEP3tz3jyd2LXUEjkYJHyWSuwUvHDaRJ',
          'QmZ324xmvYEa7cHqk32jz51jiMHzRRLHkHxMur3hKy8GaX',
          'QmPRWjy3xqbxukKBMVTYH6Zk44gkVJFwzexzvZYfM164Rv',
          'QmVKgd4AzrnjKFiuuXEKvfuDz1uoYGeagddrdNTmYvN2wX',
          'QmcLrjZcHqiB4rv3Tf6CoBEUNEPGQsRCK18gJQS2Xs6am1',
          'QmX6LC9u4R4Q4aQtEnZKhFbzEesNtXFFjZSZg8rzdzrG36'
        ]
      },
        // Playlist: Cryptoeconomy & Events
      {
        _id: '2',
        title: 'Cryptoeconomy & Events',
        description: '',
        url: 'Cryptoeconomy-and-events',
        videos: [
          'QmP4wvUBhKyygjdf8XLkA6p79FsUCtc2TR3i1NzBoK2krr',
          'QmW9fin8DKeCyjY6PZAZ3qShGvbMr8xFk4aFcppMdktgT9',
          'QmNPZWg2F946MjvLKFmyFkQ3kP1PbUazsKof1cmFUoTf98',
          'QmTUymnMrHiZdMvvJfjx8m8YjrzHXEZCwV23BNqGXDHqcy',
          'QmQUgoZTGjJYdMYbaRZgSYwuJhLfiej7TwxJnwbw5Akmo9',
          'QmVyvdBHB17n3Z2AkBMRexS6CQkyeLKYWeX8LsDfT3zPej',
          'QmQ1jsHFHr1ovP9MnNumorcBZPxheJtrrWczrNvCmRkjCH',
          'QmQmBaxNvXcYWfDvPRw9RPUq1RyMmV1N8y5fdgbxaArt4V',
          'QmTMP3QjDLxGdLHxE9mzwm3rytvY9y4Z1ZCTwKNtFsGCva',
          'QmYD2CSJ6gkeUaSwwUq1EM1eRFtjvkhpSFToiyQrvp8DHW',
          'QmVc9KLKyViB5DZoYqx7fw3DUSsWwdGbeExcu3EShYtRp5',
          'QmSTWrx4g1dQwhNJhaiDwzk6D3693VY3uaMkDDgZqYHKXC',
          'QmY2iJsCzedduKPAtib6nCKWd8fqYqTMnwFegh544Q7tW7',
          'QmQoLWBBLzygZh1ucj1EzyzMqySzGWmMGSpfAyZcqZr5Dn',
          'QmQNmx5C6YpbP5KtWiB3wHB8Cz2UpBA1RLa31emCs1Z54m',
          'Qme2fnAMS4daJB1V43rppqrQ41a3CkjMsHYKAhbhnXehdF',
          'QmbPX1XtKe2AwkeVWZJnrNkdv9ogn4oiQ85c2HjaLtAKiF',
          'QmNhyQjsFW2Tvuz7CFwDTBPo3dfBQ3S4StEpfUZPSpK9FY',
          'QmTu5dEdUk37hAcXBBa9Y8zRfd5rnY4gSCTahbYYkJPZsU',
          'Qme2wSA7HgNYpdYRKFUpGHD2W7taZqG4gusrKNGs73NkGZ',
          'Qmd3z2r86HCvA1PThaKbn6b9K9HkxCLmJnVR9DSAkWgsC9',
          'QmciKoXJ7u9vTCa5TniiUxzNTPWD5fHvTUUDQivd3YBbdb',
          'Qmc5PEWf3Ns31rwXirjjcAMFBn1paQ9T9YtzxWeRCqnDDD',
          'QmZttMGbpJAkK9Nt8tVyoAxXJKcNLPmWPhhZhe52WoR2LV',
          'QmUo377i6myRDXjZNxhcdjbvtKkN4QqFjLC5WXQZdguT9s',
          'Qmbytj8B3A5MD8QX69oGaXEAp4ZUdF7A2BT2tC5fb1G6TF'
        ]
      },
        // Playlist: Brainy movies & music for the weekend
      {
        _id: '3',
        title: 'Brainy movies & music for the weekend',
        description: '',
        url: 'Brainy-movies-music-for-the-weekend',
        videos: [
          'QmRfgwZWphXHhFU2h3pTozoYkZCB58KPo7zqsqsYKLdezG',
          'QmaYXEYgqVVKJcUCpXHoiX6zTqXbbQAS4JMK5BDE9BeCXn']
      },
        // Playlist: Cool projects out there
      {
        _id: '4',
        title: 'Cool projects out there',
        description: '',
        url: 'cool-projects',
        videos: [
          'QmagzVuCFuvBiw6Wv3Fog4U6SgqbiJCnbkv7ZeviG8LYqt',
          'Qmcy6hsqQrMTnZPn1W3hMv2LfcPcptmJpSmxq6frhP9A4U',
          'QmPxeBDGspPx7ir6sT7bWrHqMjwXEmqPjPRKa7eAep3bwp',
          'QmVfLF8tNK9jhxyTeqMNhj1TbUMDXRMTEhC2iZdcft6fWY'
        ]
      },
        // Playlist: Around the Block
      {
        _id: '5',
        title: 'Around the Block',
        description: '',
        url: 'around-the-block',
        videos: []
      }
    ]

    _.each(playlistList, (playlist) => {
      Playlists.insert(playlist)
    })
    console.log('--> done.')
  }

  Meteor.startup(function () {
    populateVideos()
    populatePlaylist()
  })
}
