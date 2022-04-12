//
//  Maps.swift
//  linage
//
//  Created by Martin on 09/04/2022.
//

import SwiftUI
import MapKit

struct Maps: View {
    var coordinate: CLLocationCoordinate2D
    
    let annotation = MKPointAnnotation()
    @State private var region = MKCoordinateRegion()
    var body: some View {
        Map(coordinateRegion: $region)
            .onAppear {
                            setRegion(coordinate)
                        }
    }
    private func setRegion(_ coordinate: CLLocationCoordinate2D) {
            region = MKCoordinateRegion(
                center: coordinate,
                span: MKCoordinateSpan(latitudeDelta: 0.003, longitudeDelta: 0.003)
            )
        }
}

struct Maps_Previews: PreviewProvider {
    static var previews: some View {
        Maps(coordinate: CLLocationCoordinate2D(latitude: 34.011_286, longitude: -116.166_868))
    }
}
