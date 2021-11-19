import React, {useState, useEffect, FC, SetStateAction, Dispatch} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {SearchBar} from 'react-native-elements';
import { searchMovieByTitle } from './API/api';
import { useNavigation } from '@react-navigation/native';
import darkColors from 'react-native-elements/dist/config/colorsDark';

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [searchInput, setsearchInput] = useState('');
  const [movieResponse, setmovieResponse] = useState('');
  const [movieList, setMovieList] = useState('');
  const navigation = useNavigation();

  const FlatListBasic = () => {
    return (
      //   <View style={{flexDirection: 'column'}}>
      //     <View style={{flexDirection: 'row'}}>
            <View style = {{flexDirection: 'row'}} >
              <Text style={{fontSize: 20}}>MovieList</Text>
            </View>
      //       <View style = {{flexDirection: 'row-reverse'}} >
      //         <Text style={{fontSize: 20}}>More</Text>
      //       </View>

      //     </View>
      //     <View style={{flexDirection: 'row'}}>{/* movies */}</View>
      //   </View>

    //   <PreviewLayout
    //     selectedValue={'space-between'}>
    //     <View>
    //         <Text style={{fontSize: 20}}>MovieList</Text>
    //     </View>
    //     <View>
    //         <Text style={{fontSize: 20}}>More</Text>
    //     </View>
    //   </PreviewLayout>
    );
  };

//   show item layout
  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity 
        onPress={() => {
          console.log(item.Title)
          navigation.navigate({
            name: 'MovieDetails',
            params: { movie: item },
          });
        }}
      >
        <Image source={{uri: item.Poster}}
                style={{width: 400, height: 400}} />
        <Text>{item.Title}</Text>
        {/* <Text>{item.Poster}</Text> */}
        <Text>{item.Year}</Text>
      </TouchableOpacity>
    </View> 
  );

//   show item list
  const SearchList = () => {
   return( 
    <FlatList
        data={movieList}
        renderItem={renderItem}
        keyExtractor={item => item.imdbID}
      />
   )
  }

  
   
   useEffect(()=>{
     searchMovieByTitle(searchInput).then((res)=>{
      if(res.Response === 'True'){
        setMovieList(res.Search)
        console.log(res.Search)
      }else{
        console.log(false)
      }
     });
   },[searchInput])


  return (
    <View style={backgroundStyle}>
      <View
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* Search bar */}
        <SearchBar
          placeholder="Search"
          onChangeText={setsearchInput}
          value={searchInput}
        />
      </View>
      <View>
        {searchInput.length > 0? <SearchList/> :<FlatListBasic />}
      </View>
      
    </View>
    
  );
};

export default Home;
