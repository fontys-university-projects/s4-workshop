//
//  CampusDetails.swift
//  linage
//
//  Created by Martin on 12/04/2022.
//

import SwiftUI

struct CampusDetails: View {
    var location: Location
    var body: some View {
        ScrollView {
            Maps(coordinate: location.locationCoordinate)
                .ignoresSafeArea(edges: .top)
                .frame(height: 300)
            Campus_Avatar_Circle(image: location.image)
                .offset(y: -85)
                .padding(.bottom, -85)
            Text(location.name)
                .font(.title)
            Divider()
            VStack {
                HStack {
                    Text("Location").font(.title2)
                    Spacer()
                    Text(location.location).font(.caption).foregroundColor(.gray)
                }
                HStack {
                    Text("Open Hours").font(.title2)
                    Spacer()
                    VStack {
                        HStack {
                            Text("Mon - Thu:").font(.caption).foregroundColor(.gray)
                            Spacer()
                            Text(location.monThu).font(.caption).foregroundColor(.gray)
                        }
                        HStack {
                            Text("Fri:").font(.caption).foregroundColor(.gray)
                            Spacer()
                            Text(location.fri).font(.caption).foregroundColor(.gray)
                        }
                        
                    }
                }

                VStack {
                    Text("Description").font(.title3)
                    Text(location.description).font(.caption).foregroundColor(.gray)
                }
            }
            .padding()
        }
        .navigationTitle(location.name)
        .navigationBarTitleDisplayMode(.inline)

    }
}

struct CampusDetails_Previews: PreviewProvider {
    static var previews: some View {
        CampusDetails(location: locations[0])
    }
}
