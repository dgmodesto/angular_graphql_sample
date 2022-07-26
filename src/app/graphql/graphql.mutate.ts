import {gql} from 'apollo-angular'


// neste arquivo pode concentrar todos os seus mutates.
// Por exemplo 
//    Isso é somente um exemplo, a api utilizada nessa poc não oferece métodos para adicionar um novo anime

const ADD_ANIME = gql`
  mutation addAnime($name: String!, $description: String!) {
    addAnime(name: $name, description: $description) {
      id
      name
      description
    }
  }


`

//  Isso é somente um exemplo, a api utilizada nessa poc não oferece métodos para exclusão
 
const DELETE_ANIME = gql`

  mutation deleteAnime($id: Int!) {
    deleteAnime(id: $id) {
      id
    }
  }
  `

export { ADD_ANIME, DELETE_ANIME }