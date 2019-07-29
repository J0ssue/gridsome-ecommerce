// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// module.exports = function(api) {
//   api.loadSource(({ addContentType }) => {
//     // Use the Data Store API here: https://gridsome.org/docs/data-store-api
//   })

//   api.createPages(({ createPage }) => {
//     // Use the Pages API here: https://gridsome.org/docs/pages-api
//   })
// }


const axios = require('axios')

module.exports = function(api) {
  api.loadSource(async store => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const contentType = store.addContentType({
      typeName: 'BlogPosts',
      route: '/blogs/:id'
    })

    for (const item of data) {
      contentType.addNode({
        id: item.id,
        userId: item.userId,
        title: item.title,
        body: item.body
      })
    }
  })
}

// module.exports = function(api) {
//   api.loadSource(async store => {
//     const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
//     const contentType = store.addContentType({
//       typeName: 'Users',
//       route: '/users/:id'
//     })

//     for (const item of data) {
//       contentType.addNode({
// 				id: item.id,
// 				name: item.name,
//         username: item.username,
// 				email: item.email,
// 				address: item.address,
// 				website: item.website
//       })
//     }
//   })
// }