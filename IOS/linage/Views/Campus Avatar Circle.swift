//
//  Campus Avatar Circle.swift
//  linage
//
//  Created by Martin on 09/04/2022.
//

import SwiftUI

struct Campus_Avatar_Circle: View {
    var image: Image
    var body: some View {
        image
            .resizable()
            .clipShape(Circle())
            .overlay(Circle().stroke(.white, lineWidth: 4))
            .shadow(radius: 10)
            .frame(width: 150.0, height: 150.0)
    }
}

struct Campus_Avatar_Circle_Previews: PreviewProvider {
    static var previews: some View {
        Campus_Avatar_Circle(image: Image("FontysR10"))
    }
}
