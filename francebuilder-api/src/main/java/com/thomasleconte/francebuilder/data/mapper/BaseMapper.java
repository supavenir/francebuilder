package com.thomasleconte.francebuilder.data.mapper;

import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public interface BaseMapper<Source, Destination> {
    Destination toDestination(Source obj);
    Source toSource(Destination obj);

    //list
    default List<Destination> toDestination(List<Source> list){
        if( list == null ){
            return null;
        }
        return list.stream().map(e-> toDestination(e)).collect(Collectors.toList());
    }

    default List<Source> toSource(List<Destination> list){
        if( list == null ){
            return null;
        }
        return list.stream().map(d-> toSource((d))).collect(Collectors.toList());
    }

    //pagination
    default Page<Destination> toDestination(Page<Source> page){
        return page.map(e-> toDestination(e));
    }
}
