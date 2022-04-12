//
//  CampusesList.swift
//  linage
//
//  Created by Martin on 12/04/2022.
//

import SwiftUI

struct CampusesList: View {
    var body: some View {
        NavigationView {
            List(locations, id: \.id) { location in
                NavigationLink {
                    CampusDetails(location: location)
                } label: {
                Campuses(location: location)
                                }
            }
            .navigationTitle("Campuses")
        }
    }
}

struct CampusesList_Previews: PreviewProvider {
    static var previews: some View {
        CampusesList()
    }
}
